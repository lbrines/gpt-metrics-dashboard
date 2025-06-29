# Dashboard de Métricas para GPTs Personalizados
# Autor: Equipo DevOps
# Propósito: Modelos ORM para las tablas de PostgreSQL

import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, ForeignKey, DateTime, Text, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from ..database import Base

class GPT(Base):
    """Modelo para la tabla de GPTs personalizados."""
    __tablename__ = "gpts"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    nombre = Column(String(255), nullable=False)
    descripcion = Column(Text, nullable=True)
    fecha_creacion = Column(DateTime(timezone=True), default=datetime.utcnow)
    
    # Relaciones
    sesiones = relationship("Sesion", back_populates="gpt", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<GPT {self.nombre}>"

class Sesion(Base):
    """Modelo para la tabla de sesiones de usuario con GPTs."""
    __tablename__ = "sesiones"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    gpt_id = Column(UUID(as_uuid=True), ForeignKey("gpts.id"), nullable=False)
    usuario_id = Column(String(255), nullable=True)
    started_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    ended_at = Column(DateTime(timezone=True), nullable=True)
    duracion_ms = Column(Integer, nullable=True)
    
    # Relaciones
    gpt = relationship("GPT", back_populates="sesiones")
    eventos = relationship("Evento", back_populates="sesion", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Sesion {self.id} - GPT: {self.gpt_id}>"

class Evento(Base):
    """Modelo para la tabla de eventos durante una sesión."""
    __tablename__ = "eventos"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    sesion_id = Column(UUID(as_uuid=True), ForeignKey("sesiones.id"), nullable=False)
    tipo = Column(String(50), nullable=False)  # 'user_message', 'response', etc.
    timestamp = Column(DateTime(timezone=True), default=datetime.utcnow)
    contenido = Column(Text, nullable=True)
    latency_ms = Column(Integer, nullable=True)
    tokens_entrada = Column(Integer, nullable=True)
    tokens_salida = Column(Integer, nullable=True)
    
    # Relaciones
    sesion = relationship("Sesion", back_populates="eventos")
    
    def __repr__(self):
        return f"<Evento {self.tipo} - Sesión: {self.sesion_id}>"
