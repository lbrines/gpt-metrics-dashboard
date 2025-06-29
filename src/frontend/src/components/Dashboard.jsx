// Dashboard de Métricas para GPTs Personalizados
// Autor: Equipo DevOps
// Propósito: Componente principal del dashboard que organiza todas las métricas

import React, { useState, useEffect } from 'react';
import MetricsCard from './MetricsCard';
import SessionDurationChart from './charts/SessionDurationChart';
import SessionsChart from './charts/SessionsChart';
import {
  obtenerMensajesPorSesion,
  obtenerTiempoRespuesta,
  obtenerDuracionSesiones,
  obtenerRecuentoSesiones
} from '../services/api';

const Dashboard = ({ gptId, fechaInicio, fechaFin }) => {
  // Estados para almacenar las métricas
  const [mensajesPorSesion, setMensajesPorSesion] = useState(null);
  const [tiempoRespuesta, setTiempoRespuesta] = useState(null);
  const [duracionSesiones, setDuracionSesiones] = useState(null);
  const [recuentoSesiones, setRecuentoSesiones] = useState(null);
  
  // Estado para controlar carga
  const [cargando, setCargando] = useState({
    mensajes: false,
    tiempo: false,
    duracion: false,
    recuento: false
  });
  
  // Estado para manejar errores
  const [errores, setErrores] = useState({});

  // Efecto para cargar la métrica de mensajes por sesión
  useEffect(() => {
    const cargarMensajesPorSesion = async () => {
      if (!gptId) return;
      
      try {
        setCargando(prev => ({ ...prev, mensajes: true }));
        const datos = await obtenerMensajesPorSesion(gptId, fechaInicio, fechaFin);
        setMensajesPorSesion(datos.length > 0 ? datos[0] : null);
        
        // Limpiar error si existía
        setErrores(prev => ({ ...prev, mensajes: null }));
      } catch (error) {
        console.error('Error al cargar mensajes por sesión:', error);
        setErrores(prev => ({ 
          ...prev, 
          mensajes: 'Error al cargar la métrica de mensajes por sesión' 
        }));
      } finally {
        setCargando(prev => ({ ...prev, mensajes: false }));
      }
    };

    cargarMensajesPorSesion();
  }, [gptId, fechaInicio, fechaFin]);

  // Efecto para cargar la métrica de tiempo promedio de respuesta
  useEffect(() => {
    const cargarTiempoRespuesta = async () => {
      if (!gptId) return;
      
      try {
        setCargando(prev => ({ ...prev, tiempo: true }));
        const datos = await obtenerTiempoRespuesta(gptId, fechaInicio, fechaFin);
        setTiempoRespuesta(datos.length > 0 ? datos[0] : null);
        
        // Limpiar error si existía
        setErrores(prev => ({ ...prev, tiempo: null }));
      } catch (error) {
        console.error('Error al cargar tiempo de respuesta:', error);
        setErrores(prev => ({ 
          ...prev, 
          tiempo: 'Error al cargar la métrica de tiempo de respuesta' 
        }));
      } finally {
        setCargando(prev => ({ ...prev, tiempo: false }));
      }
    };

    cargarTiempoRespuesta();
  }, [gptId, fechaInicio, fechaFin]);

  // Efecto para cargar la métrica de duración de sesiones
  useEffect(() => {
    const cargarDuracionSesiones = async () => {
      if (!gptId) return;
      
      try {
        setCargando(prev => ({ ...prev, duracion: true }));
        const datos = await obtenerDuracionSesiones(gptId, fechaInicio, fechaFin);
        setDuracionSesiones(datos.length > 0 ? datos[0] : null);
        
        // Limpiar error si existía
        setErrores(prev => ({ ...prev, duracion: null }));
      } catch (error) {
        console.error('Error al cargar duración de sesiones:', error);
        setErrores(prev => ({ 
          ...prev, 
          duracion: 'Error al cargar la métrica de duración de sesiones' 
        }));
      } finally {
        setCargando(prev => ({ ...prev, duracion: false }));
      }
    };

    cargarDuracionSesiones();
  }, [gptId, fechaInicio, fechaFin]);

  // Efecto para cargar la métrica de recuento de sesiones
  useEffect(() => {
    const cargarRecuentoSesiones = async () => {
      if (!gptId) return;
      
      try {
        setCargando(prev => ({ ...prev, recuento: true }));
        const datos = await obtenerRecuentoSesiones(gptId, fechaInicio, fechaFin);
        setRecuentoSesiones(datos.length > 0 ? datos[0] : null);
        
        // Limpiar error si existía
        setErrores(prev => ({ ...prev, recuento: null }));
      } catch (error) {
        console.error('Error al cargar recuento de sesiones:', error);
        setErrores(prev => ({ 
          ...prev, 
          recuento: 'Error al cargar la métrica de recuento de sesiones' 
        }));
      } finally {
        setCargando(prev => ({ ...prev, recuento: false }));
      }
    };

    cargarRecuentoSesiones();
  }, [gptId, fechaInicio, fechaFin]);

  // Si no se ha seleccionado ningún GPT, mostrar mensaje
  if (!gptId) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500 text-lg">
          Selecciona un GPT para visualizar sus métricas
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Mostrar errores si existen */}
      {Object.values(errores).some(error => error !== null) && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <ul className="list-disc pl-5">
            {Object.values(errores)
              .filter(error => error !== null)
              .map((error, index) => (
                <li key={index}>{error}</li>
              ))}
          </ul>
        </div>
      )}

      {/* Tarjetas con métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricsCard
          titulo="Mensajes por Sesión"
          valor={mensajesPorSesion?.mensajes_por_sesion || '-'}
          cargando={cargando.mensajes}
        />
        <MetricsCard
          titulo="Tiempo Promedio de Respuesta"
          valor={tiempoRespuesta ? (tiempoRespuesta.tiempo_promedio_ms / 1000).toFixed(1) : '-'}
          unidad="s"
          cargando={cargando.tiempo}
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 gap-4">
        <SessionDurationChart 
          datos={duracionSesiones} 
          cargando={cargando.duracion} 
        />
        
        <SessionsChart 
          datos={recuentoSesiones} 
          cargando={cargando.recuento} 
        />
      </div>
    </div>
  );
};

export default Dashboard;
