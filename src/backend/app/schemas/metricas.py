# Dashboard de Métricas para GPTs Personalizados
# Autor: Equipo DevOps
# Propósito: Esquemas Pydantic para validación de datos

from datetime import datetime
from typing import Optional, List
from uuid import UUID
from pydantic import BaseModel, Field

# Esquemas para GPT
class GPTBase(BaseModel):
    """Esquema base para GPTs."""
    nombre: str
    descripcion: Optional[str] = None

class GPTCreate(GPTBase):
    """Esquema para crear un GPT."""
    pass

class GPT(GPTBase):
    """Esquema para devolver un GPT."""
    id: UUID
    fecha_creacion: datetime
    
    class Config:
        orm_mode = True

# Esquemas para Sesión
class SesionBase(BaseModel):
    """Esquema base para sesiones."""
    gpt_id: UUID
    usuario_id: Optional[str] = None

class SesionCreate(SesionBase):
    """Esquema para crear una sesión."""
    pass

class SesionUpdate(BaseModel):
    """Esquema para actualizar una sesión."""
    ended_at: Optional[datetime] = None
    duracion_ms: Optional[int] = None

class Sesion(SesionBase):
    """Esquema para devolver una sesión."""
    id: UUID
    started_at: datetime
    ended_at: Optional[datetime] = None
    duracion_ms: Optional[int] = None
    
    class Config:
        orm_mode = True

# Esquemas para Evento
class EventoBase(BaseModel):
    """Esquema base para eventos."""
    sesion_id: UUID
    tipo: str = Field(..., description="Tipo de evento: 'user_message', 'response', etc.")
    contenido: Optional[str] = None
    latency_ms: Optional[int] = None
    tokens_entrada: Optional[int] = None
    tokens_salida: Optional[int] = None

class EventoCreate(EventoBase):
    """Esquema para crear un evento."""
    pass

class Evento(EventoBase):
    """Esquema para devolver un evento."""
    id: UUID
    timestamp: datetime
    
    class Config:
        orm_mode = True

# Esquemas para Métricas
class MetricasMensajesPorSesion(BaseModel):
    """Esquema para la métrica de mensajes por sesión."""
    gpt_id: UUID
    gpt_nombre: str
    mensajes_por_sesion: float

class MetricasTiempoRespuesta(BaseModel):
    """Esquema para la métrica de tiempo promedio de respuesta."""
    gpt_id: UUID
    gpt_nombre: str
    tiempo_promedio_ms: float

class DistribucionDuracionSesion(BaseModel):
    """Esquema para histograma de duración de sesiones."""
    rango: str  # Ej: "0-1 min", "1-2 min", etc.
    cantidad: int

class MetricasDuracionSesion(BaseModel):
    """Esquema para la métrica de duración de sesiones."""
    gpt_id: UUID
    gpt_nombre: str
    distribucion: List[DistribucionDuracionSesion]

class RecuentoSesiones(BaseModel):
    """Esquema para el recuento diario de sesiones."""
    fecha: str  # Formato YYYY-MM-DD
    cantidad: int

class MetricasRecuentoSesiones(BaseModel):
    """Esquema para la métrica de recuento de sesiones."""
    gpt_id: UUID
    gpt_nombre: str
    recuento_diario: List[RecuentoSesiones]

class FiltroFechas(BaseModel):
    """Esquema para filtrar métricas por rango de fechas."""
    fecha_inicio: Optional[datetime] = None
    fecha_fin: Optional[datetime] = None
