# Dashboard de Métricas para GPTs Personalizados
# Autor: Equipo DevOps
# Propósito: Endpoint para gestionar eventos durante sesiones de GPT

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID

from ...database import obtener_db
from ...models.metricas import Evento, Sesion
from ...schemas.metricas import EventoCreate, Evento as EventoSchema

router = APIRouter()

@router.post("/events", response_model=EventoSchema, status_code=status.HTTP_201_CREATED)
def crear_evento(evento: EventoCreate, db: Session = Depends(obtener_db)):
    """
    Registra un nuevo evento durante una sesión de GPT.
    """
    # Verificar que la sesión existe
    sesion = db.query(Sesion).filter(Sesion.id == evento.sesion_id).first()
    if not sesion:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Sesión con ID {evento.sesion_id} no encontrada"
        )
    
    # Crear nuevo evento
    db_evento = Evento(**evento.model_dump())
    db.add(db_evento)
    db.commit()
    db.refresh(db_evento)
    return db_evento

@router.get("/events", response_model=List[EventoSchema])
def obtener_eventos(
    sesion_id: Optional[UUID] = None, 
    tipo: Optional[str] = None,
    db: Session = Depends(obtener_db)
):
    """
    Obtiene la lista de eventos con opciones de filtrado por sesión y tipo.
    """
    query = db.query(Evento)
    
    # Aplicar filtros si se proporcionaron
    if sesion_id:
        query = query.filter(Evento.sesion_id == sesion_id)
    
    if tipo:
        query = query.filter(Evento.tipo == tipo)
    
    # Ordenar por timestamp ascendente (cronológico)
    eventos = query.order_by(Evento.timestamp.asc()).all()
    return eventos

@router.get("/events/{evento_id}", response_model=EventoSchema)
def obtener_evento(evento_id: UUID, db: Session = Depends(obtener_db)):
    """
    Obtiene un evento específico por su ID.
    """
    evento = db.query(Evento).filter(Evento.id == evento_id).first()
    if not evento:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Evento con ID {evento_id} no encontrado"
        )
    return evento
