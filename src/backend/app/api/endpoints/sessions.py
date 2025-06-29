# Dashboard de Métricas para GPTs Personalizados
# Autor: Equipo DevOps
# Propósito: Endpoint para gestionar sesiones de GPT

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID
from datetime import datetime

from ...database import obtener_db
from ...models.metricas import Sesion, GPT
from ...schemas.metricas import SesionCreate, Sesion as SesionSchema, SesionUpdate
from ...dependencies import verificar_token_gpt

router = APIRouter()

@router.post("/sessions", response_model=SesionSchema, status_code=status.HTTP_201_CREATED)
def crear_sesion(sesion: SesionCreate, db: Session = Depends(obtener_db), token: str = Depends(verificar_token_gpt)):
    """
    Crea una nueva sesión para un GPT específico.
    """
    # Verificar que el GPT existe
    gpt = db.query(GPT).filter(GPT.id == sesion.gpt_id).first()
    if not gpt:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"GPT con ID {sesion.gpt_id} no encontrado"
        )
    
    # Crear nueva sesión
    db_sesion = Sesion(**sesion.model_dump())
    db.add(db_sesion)
    db.commit()
    db.refresh(db_sesion)
    return db_sesion

@router.get("/sessions", response_model=List[SesionSchema])
def obtener_sesiones(
    gpt_id: Optional[UUID] = None, 
    fecha_inicio: Optional[datetime] = None, 
    fecha_fin: Optional[datetime] = None,
    db: Session = Depends(obtener_db),
    token: str = Depends(verificar_token_gpt)
):
    """
    Obtiene la lista de sesiones con opciones de filtrado por GPT y rango de fechas.
    """
    query = db.query(Sesion)
    
    # Aplicar filtros si se proporcionaron
    if gpt_id:
        query = query.filter(Sesion.gpt_id == gpt_id)
    
    if fecha_inicio:
        query = query.filter(Sesion.started_at >= fecha_inicio)
    
    if fecha_fin:
        query = query.filter(Sesion.started_at <= fecha_fin)
    
    # Ordenar por fecha de inicio descendente (más recientes primero)
    sesiones = query.order_by(Sesion.started_at.desc()).all()
    return sesiones

@router.get("/sessions/{sesion_id}", response_model=SesionSchema)
def obtener_sesion(sesion_id: UUID, db: Session = Depends(obtener_db), token: str = Depends(verificar_token_gpt)):
    """
    Obtiene una sesión específica por su ID.
    """
    sesion = db.query(Sesion).filter(Sesion.id == sesion_id).first()
    if not sesion:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Sesión con ID {sesion_id} no encontrada"
        )
    return sesion

@router.put("/sessions/{sesion_id}", response_model=SesionSchema)
def actualizar_sesion(sesion_id: UUID, sesion_actualizada: SesionUpdate, db: Session = Depends(obtener_db), token: str = Depends(verificar_token_gpt)):
    """
    Actualiza una sesión existente, especialmente para marcar su finalización.
    """
    db_sesion = db.query(Sesion).filter(Sesion.id == sesion_id).first()
    if not db_sesion:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Sesión con ID {sesion_id} no encontrada"
        )
    
    # Actualizar campos de la sesión
    datos_actualizacion = sesion_actualizada.model_dump(exclude_unset=True)
    for clave, valor in datos_actualizacion.items():
        setattr(db_sesion, clave, valor)
    
    db.commit()
    db.refresh(db_sesion)
    return db_sesion
