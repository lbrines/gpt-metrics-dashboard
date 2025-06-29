# Dashboard de Métricas para GPTs Personalizados
# Autor: Equipo DevOps
# Propósito: Servicio para cálculo de métricas de GPTs

from sqlalchemy import func, desc, cast, Date
from sqlalchemy.orm import Session
from typing import List, Dict, Optional
from datetime import datetime, timedelta
import pandas as pd
from uuid import UUID

from ..models.metricas import GPT, Sesion, Evento
from ..schemas.metricas import (
    MetricasMensajesPorSesion, MetricasTiempoRespuesta,
    MetricasDuracionSesion, DistribucionDuracionSesion,
    MetricasRecuentoSesiones, RecuentoSesiones
)

class ServicioMetricas:
    """Servicio para cálculo de métricas relacionadas con GPTs."""
    
    @staticmethod
    def calcular_mensajes_por_sesion(
        db: Session, 
        gpt_id: Optional[UUID] = None, 
        fecha_inicio: Optional[datetime] = None,
        fecha_fin: Optional[datetime] = None
    ) -> List[MetricasMensajesPorSesion]:
        """
        Calcula la métrica 'mensajes por sesión' para uno o todos los GPTs.
        """
        query = db.query(
            GPT.id,
            GPT.nombre,
            func.count(Evento.id).filter(Evento.tipo == 'user_message').label('total_mensajes'),
            func.count(Sesion.id.distinct()).label('total_sesiones')
        ).join(Sesion, GPT.id == Sesion.gpt_id)\
         .join(Evento, Sesion.id == Evento.sesion_id)
        
        # Aplicar filtros si se proporcionan
        if gpt_id:
            query = query.filter(GPT.id == gpt_id)
            
        if fecha_inicio:
            query = query.filter(Sesion.started_at >= fecha_inicio)
            
        if fecha_fin:
            query = query.filter(Sesion.started_at <= fecha_fin)
        
        # Agrupar por GPT y calcular la métrica
        resultados = query.group_by(GPT.id, GPT.nombre).all()
        
        # Formatear resultados
        metricas = []
        for gpt_id, gpt_nombre, total_mensajes, total_sesiones in resultados:
            mensajes_por_sesion = total_mensajes / total_sesiones if total_sesiones > 0 else 0
            metricas.append(MetricasMensajesPorSesion(
                gpt_id=gpt_id,
                gpt_nombre=gpt_nombre,
                mensajes_por_sesion=round(mensajes_por_sesion, 2)  # Redondear a 2 decimales
            ))
        
        return metricas
    
    @staticmethod
    def calcular_tiempo_respuesta_promedio(
        db: Session, 
        gpt_id: Optional[UUID] = None,
        fecha_inicio: Optional[datetime] = None,
        fecha_fin: Optional[datetime] = None
    ) -> List[MetricasTiempoRespuesta]:
        """
        Calcula el tiempo de respuesta promedio para uno o todos los GPTs.
        """
        query = db.query(
            GPT.id,
            GPT.nombre,
            func.avg(Evento.latency_ms).label('tiempo_promedio')
        ).join(Sesion, GPT.id == Sesion.gpt_id)\
         .join(Evento, Sesion.id == Evento.sesion_id)\
         .filter(Evento.tipo == 'response')
        
        # Aplicar filtros si se proporcionan
        if gpt_id:
            query = query.filter(GPT.id == gpt_id)
            
        if fecha_inicio:
            query = query.filter(Sesion.started_at >= fecha_inicio)
            
        if fecha_fin:
            query = query.filter(Sesion.started_at <= fecha_fin)
        
        # Agrupar por GPT y calcular la métrica
        resultados = query.group_by(GPT.id, GPT.nombre).all()
        
        # Formatear resultados
        metricas = []
        for gpt_id, gpt_nombre, tiempo_promedio in resultados:
            metricas.append(MetricasTiempoRespuesta(
                gpt_id=gpt_id,
                gpt_nombre=gpt_nombre,
                tiempo_promedio_ms=round(tiempo_promedio if tiempo_promedio else 0, 2)
            ))
        
        return metricas
    
    @staticmethod
    def calcular_duracion_sesiones(
        db: Session, 
        gpt_id: Optional[UUID] = None,
        fecha_inicio: Optional[datetime] = None,
        fecha_fin: Optional[datetime] = None
    ) -> List[MetricasDuracionSesion]:
        """
        Calcula la distribución de duración de sesiones para uno o todos los GPTs.
        """
        # Obtener las sesiones con duración calculada
        query = db.query(
            GPT.id,
            GPT.nombre,
            Sesion.duracion_ms
        ).join(Sesion, GPT.id == Sesion.gpt_id)\
         .filter(Sesion.duracion_ms.isnot(None))
        
        # Aplicar filtros si se proporcionan
        if gpt_id:
            query = query.filter(GPT.id == gpt_id)
            
        if fecha_inicio:
            query = query.filter(Sesion.started_at >= fecha_inicio)
            
        if fecha_fin:
            query = query.filter(Sesion.started_at <= fecha_fin)
        
        # Ejecutar consulta
        resultados = query.all()
        
        # Agrupar resultados por GPT
        datos_por_gpt = {}
        for gpt_id, gpt_nombre, duracion_ms in resultados:
            if gpt_id not in datos_por_gpt:
                datos_por_gpt[gpt_id] = {
                    'nombre': gpt_nombre,
                    'duraciones': []
                }
            
            datos_por_gpt[gpt_id]['duraciones'].append(duracion_ms)
        
        # Definir rangos para el histograma (en minutos)
        rangos = [
            (0, 60000),       # 0-1 min
            (60000, 120000),  # 1-2 min
            (120000, 180000), # 2-3 min
            (180000, 240000), # 3-4 min
            (240000, 300000), # 4-5 min
            (300000, float('inf'))  # >5 min
        ]
        
        etiquetas_rangos = ["0-1 min", "1-2 min", "2-3 min", "3-4 min", "4-5 min", ">5 min"]
        
        # Calcular histogramas para cada GPT
        metricas = []
        for gpt_id, datos in datos_por_gpt.items():
            # Usar pandas para calcular el histograma
            df = pd.DataFrame(datos['duraciones'], columns=['duracion'])
            histograma = []
            
            for i, (inicio, fin) in enumerate(rangos):
                count = len(df[(df['duracion'] >= inicio) & (df['duracion'] < fin)])
                histograma.append(DistribucionDuracionSesion(
                    rango=etiquetas_rangos[i],
                    cantidad=count
                ))
            
            metricas.append(MetricasDuracionSesion(
                gpt_id=gpt_id,
                gpt_nombre=datos['nombre'],
                distribucion=histograma
            ))
        
        return metricas
    
    @staticmethod
    def calcular_recuento_sesiones(
        db: Session, 
        gpt_id: Optional[UUID] = None,
        fecha_inicio: Optional[datetime] = None,
        fecha_fin: Optional[datetime] = None,
        dias: int = 30
    ) -> List[MetricasRecuentoSesiones]:
        """
        Calcula el recuento diario de sesiones para uno o todos los GPTs.
        """
        # Establecer fecha de inicio y fin por defecto si no se proporcionan
        if not fecha_fin:
            fecha_fin = datetime.now()
        
        if not fecha_inicio:
            fecha_inicio = fecha_fin - timedelta(days=dias)
        
        # Consulta para obtener el recuento diario de sesiones
        query = db.query(
            GPT.id,
            GPT.nombre,
            cast(Sesion.started_at, Date).label('fecha'),
            func.count(Sesion.id).label('cantidad')
        ).join(Sesion, GPT.id == Sesion.gpt_id)\
         .filter(Sesion.started_at.between(fecha_inicio, fecha_fin))
        
        # Aplicar filtro por GPT si se proporciona
        if gpt_id:
            query = query.filter(GPT.id == gpt_id)
        
        # Agrupar por GPT y fecha
        resultados = query.group_by(
            GPT.id,
            GPT.nombre,
            cast(Sesion.started_at, Date)
        ).order_by(GPT.id, cast(Sesion.started_at, Date)).all()
        
        # Agrupar resultados por GPT
        recuentos_por_gpt = {}
        for gpt_id, gpt_nombre, fecha, cantidad in resultados:
            if gpt_id not in recuentos_por_gpt:
                recuentos_por_gpt[gpt_id] = {
                    'nombre': gpt_nombre,
                    'recuentos': []
                }
            
            recuentos_por_gpt[gpt_id]['recuentos'].append(
                RecuentoSesiones(
                    fecha=fecha.strftime("%Y-%m-%d"),
                    cantidad=cantidad
                )
            )
        
        # Formatear resultados finales
        metricas = []
        for gpt_id, datos in recuentos_por_gpt.items():
            metricas.append(MetricasRecuentoSesiones(
                gpt_id=gpt_id,
                gpt_nombre=datos['nombre'],
                recuento_diario=datos['recuentos']
            ))
        
        return metricas
