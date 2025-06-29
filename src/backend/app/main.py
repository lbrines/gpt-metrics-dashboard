# Dashboard de Métricas para GPTs Personalizados
# Autor: Equipo DevOps
# Propósito: Punto de entrada principal de la aplicación FastAPI

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import json
import os
from typing import List
import logging
from pydantic import BaseModel

from .config import configuracion
from .database import Base, motor_db
from .api.endpoints import health, sessions, events, metrics

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

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
