# Dashboard de Métricas para GPTs Personalizados
# Autor: Equipo DevOps
# Propósito: Endpoint para consultar métricas de GPTs

from fastapi import APIRouter, Depends, Query, Response
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID
from datetime import datetime

from ...database import obtener_db
from ...services.metrics_service import ServicioMetricas
from ...schemas.metricas import (
    MetricasMensajesPorSesion, MetricasTiempoRespuesta,
    MetricasDuracionSesion, MetricasRecuentoSesiones
)
from ...dependencies import verificar_token_gpt

router = APIRouter()

@router.get("/messages-per-session", response_model=List[MetricasMensajesPorSesion])
def obtener_mensajes_por_sesion(
    gpt_id: Optional[UUID] = None,
    fecha_inicio: Optional[datetime] = Query(None),
    fecha_fin: Optional[datetime] = Query(None),
    db: Session = Depends(obtener_db),
    token: str = Depends(verificar_token_gpt)
):
    """
    Obtiene la métrica de mensajes por sesión para uno o todos los GPTs.
    """
    return ServicioMetricas.calcular_mensajes_por_sesion(db, gpt_id, fecha_inicio, fecha_fin)

@router.get("/response-time", response_model=List[MetricasTiempoRespuesta])
def obtener_tiempo_respuesta(
    gpt_id: Optional[UUID] = None,
    fecha_inicio: Optional[datetime] = Query(None),
    fecha_fin: Optional[datetime] = Query(None),
    db: Session = Depends(obtener_db),
    token: str = Depends(verificar_token_gpt)
):
    """
    Obtiene la métrica de tiempo promedio de respuesta para uno o todos los GPTs.
    """
    return ServicioMetricas.calcular_tiempo_respuesta_promedio(db, gpt_id, fecha_inicio, fecha_fin)

@router.get("/session-duration", response_model=List[MetricasDuracionSesion])
def obtener_duracion_sesiones(
    gpt_id: Optional[UUID] = None,
    fecha_inicio: Optional[datetime] = Query(None),
    fecha_fin: Optional[datetime] = Query(None),
    db: Session = Depends(obtener_db),
    token: str = Depends(verificar_token_gpt)
):
    """
    Obtiene la distribución de duración de sesiones para uno o todos los GPTs.
    """
    return ServicioMetricas.calcular_duracion_sesiones(db, gpt_id, fecha_inicio, fecha_fin)

@router.get("/sessions-count", response_model=List[MetricasRecuentoSesiones])
def obtener_recuento_sesiones(
    gpt_id: Optional[UUID] = None,
    fecha_inicio: Optional[datetime] = Query(None),
    fecha_fin: Optional[datetime] = Query(None),
    dias: int = Query(30, ge=1, le=365),
    db: Session = Depends(obtener_db),
    token: str = Depends(verificar_token_gpt)
):
    """
    Obtiene el recuento diario de sesiones para uno o todos los GPTs.
    """
    return ServicioMetricas.calcular_recuento_sesiones(db, gpt_id, fecha_inicio, fecha_fin, dias)

@router.get("/gpts")
def obtener_gpts(db: Session = Depends(obtener_db)):
    """
    Obtiene la lista de GPTs disponibles para el selector del dashboard.
    """
    from ...models.metricas import GPT
    gpts = db.query(GPT.id, GPT.nombre).all()
    return Response(
        content=str([{"id": str(id), "nombre": nombre} for id, nombre in gpts]),
        media_type="application/json",
        headers={"Cache-Control": "no-cache, no-store, must-revalidate"}
    )
