# Dashboard de Métricas para GPTs Personalizados
# Autor: Equipo DevOps
# Propósito: Punto de entrada principal de la aplicación FastAPI

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
import uvicorn
import json
import os
from typing import List
import logging
from pydantic import BaseModel
from sqlalchemy.orm import Session
from datetime import datetime
from pathlib import Path

from .config import configuracion
from .database import Base, motor_db, obtener_db
from .api.endpoints import health, sessions, events, metrics
from .models.metricas import GPT, Sesion
from .schemas.metricas import GPT as GPTSchema, Sesion as SesionSchema
from .dependencies import verificar_token_gpt, validar_configuracion_token

# Crear tablas en la base de datos (si no existen)
Base.metadata.create_all(bind=motor_db)

# Inicializar aplicación FastAPI
app = FastAPI(
    title=configuracion.APP_NAME,
    description="API para recolectar y analizar métricas de GPTs personalizados",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

@app.on_event("startup")
async def validar_configuracion_inicio():
    """Valida la configuración de seguridad al iniciar la aplicación."""
    if not validar_configuracion_token():
        logging.warning(
            "⚠️  GPT_API_TOKEN no está configurado correctamente. "
            "Los endpoints protegidos requerirán un token válido."
        )
    else:
        logging.info("✅ Configuración de seguridad validada correctamente")

# Configurar CORS para permitir peticiones desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=configuracion.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir routers de endpoints
app.include_router(health.router, tags=["Salud"])
app.include_router(sessions.router, tags=["Sesiones"])
app.include_router(events.router, tags=["Eventos"])
app.include_router(metrics.router, prefix="/metrics", tags=["Métricas"])

class GPTConfig(BaseModel):
    code: str
    name: str

class GPTSyncResult(BaseModel):
    created: List[str]
    updated: List[str]
    skipped: List[str]

class SesionCreateByCode(BaseModel):
    gpt_code: str
    usuario_id: str
    timestamp_inicio: datetime

@app.get("/", tags=["Raíz"])
def leer_raiz():
    """Endpoint raíz que devuelve información básica sobre la API."""
    return {
        "mensaje": "API del Dashboard de Métricas para GPTs Personalizados",
        "version": "1.0.0",
        "documentación": "/docs"
    }

@app.get("/gpts", response_model=List[GPTConfig], tags=["GPTs"])
def obtener_gpts_config():
    """Endpoint que devuelve la lista de GPTs disponibles desde un archivo de configuración."""
    try:
        # Ruta al archivo JSON relativa a la ubicación del script
        config_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "config")
        json_path = os.path.join(config_dir, "gpts.json")
        
        # Verificar si el directorio existe, si no, crearlo
        if not os.path.exists(config_dir):
            os.makedirs(config_dir)
            logging.warning(f"El directorio de configuración no existía y ha sido creado: {config_dir}")
        
        # Verificar si el archivo existe
        if not os.path.exists(json_path):
            # Crear un archivo de ejemplo si no existe
            ejemplo_gpts = [
                {"code": "dummy-advisor", "name": "Dummy Advisor GPT"},
                {"code": "cannabis-advisor", "name": "Cannabis Cultivation Advisor"}
            ]
            with open(json_path, 'w') as f:
                json.dump(ejemplo_gpts, f, indent=2)
            logging.warning(f"El archivo de configuración no existía y ha sido creado con datos de ejemplo: {json_path}")
        
        # Leer el archivo JSON
        with open(json_path, 'r') as f:
            gpts_data = json.load(f)
        
        return gpts_data
    except Exception as e:
        logging.error(f"Error al cargar la configuración de GPTs: {str(e)}")
        return []

@app.post("/sync-gpts", response_model=GPTSyncResult, tags=["GPTs"])
def sync_gpts_from_config(token: str = Depends(verificar_token_gpt)):
    """Sincroniza los GPTs desde el archivo de configuración hacia la base de datos."""
    try:
        # Ruta al archivo JSON relativa a la ubicación del script
        config_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "config")
        json_path = os.path.join(config_dir, "gpts.json")
        
        if not os.path.exists(json_path):
            raise HTTPException(status_code=404, detail="Archivo de configuración no encontrado")
        
        # Leer el archivo JSON
        with open(json_path, 'r') as f:
            gpts_data = json.load(f)
        
        db: Session = next(obtener_db())
        created = []
        updated = []
        skipped = []
        
        for gpt_config in gpts_data:
            code = gpt_config.get("code")
            name = gpt_config.get("name")
            
            if not code or not name:
                continue
                
            # Buscar si ya existe un GPT con esta descripción (usando descripción para almacenar el código)
            existing_gpt = db.query(GPT).filter(GPT.descripcion == f"code:{code}").first()
            
            if existing_gpt:
                # Actualizar si el nombre cambió
                if existing_gpt.nombre != name:
                    existing_gpt.nombre = name
                    updated.append(code)
                else:
                    skipped.append(code)
            else:
                # Crear nuevo GPT
                new_gpt = GPT(
                    nombre=name,
                    descripcion=f"code:{code}"
                )
                db.add(new_gpt)
                created.append(code)
        
        db.commit()
        db.close()
        
        return GPTSyncResult(created=created, updated=updated, skipped=skipped)
        
    except Exception as e:
        logging.error(f"Error al sincronizar GPTs: {str(e)}")
        return GPTSyncResult(created=[], updated=[], skipped=[])

@app.get("/gpts-db", response_model=List[GPTSchema], tags=["GPTs"])
def obtener_gpts_db(token: str = Depends(verificar_token_gpt)):
    """Obtiene los GPTs desde la base de datos."""
    try:
        db: Session = next(obtener_db())
        gpts = db.query(GPT).all()
        db.close()
        return gpts
    except Exception as e:
        logging.error(f"Error al obtener GPTs de la base de datos: {str(e)}")
        return []

@app.post("/sessions-by-code", response_model=SesionSchema, tags=["Sesiones"])
def crear_sesion_por_codigo(sesion: SesionCreateByCode, token: str = Depends(verificar_token_gpt)):
    """Crea una nueva sesión usando el código del GPT en lugar del UUID."""
    try:
        db: Session = next(obtener_db())
        
        # Buscar el GPT por código
        gpt = db.query(GPT).filter(GPT.descripcion == f"code:{sesion.gpt_code}").first()
        if not gpt:
            raise HTTPException(status_code=404, detail=f"GPT con código '{sesion.gpt_code}' no encontrado")
        
        # Crear nueva sesión
        new_sesion = Sesion(
            gpt_id=gpt.id,
            usuario_id=sesion.usuario_id,
            started_at=sesion.timestamp_inicio
        )
        db.add(new_sesion)
        db.commit()
        db.refresh(new_sesion)
        db.close()
        
        return new_sesion
        
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error al crear sesión por código: {str(e)}")
        raise HTTPException(status_code=500, detail="Error interno del servidor")

@app.get("/privacy", response_class=Response, include_in_schema=False, tags=["Legal"])
async def privacy_policy():
    """
    Devuelve la página de Política de Privacidad.
    URL pública: https://koomtai.com/privacy
    
    Returns:
        Response: HTML content of the privacy policy with proper headers
    """
    try:
        # Ruta al archivo HTML de la política de privacidad
        privacy_path = Path(__file__).parent.parent.parent.parent / "privacy" / "privacy.html"
        
        if not privacy_path.exists():
            logging.error(f"Archivo de política de privacidad no encontrado: {privacy_path}")
            raise HTTPException(status_code=404, detail="Privacy policy not found")
        
        content = privacy_path.read_text(encoding="utf-8")
        
        return Response(
            content=content, 
            media_type="text/html",
            headers={
                "Cache-Control": "public, max-age=3600",  # Cache por 1 hora
                "X-Content-Type-Options": "nosniff",     # Seguridad adicional
                "X-Frame-Options": "DENY"                # Prevenir embedding
            }
        )
        
    except Exception as e:
        logging.error(f"Error al servir política de privacidad: {str(e)}")
        raise HTTPException(status_code=500, detail="Error interno del servidor")

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
