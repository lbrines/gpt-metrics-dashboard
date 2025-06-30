// Dashboard de Métricas para GPTs Personalizados
// Autor: Equipo DevOps
// Propósito: Servicios para comunicación con el backend

import axios from 'axios';

// URL base del backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Token de autenticación (debe configurarse en variables de entorno)
const GPT_API_TOKEN = import.meta.env.VITE_GPT_API_TOKEN || '';

// Cliente axios configurado
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    ...(GPT_API_TOKEN && { 'Authorization': `Bearer ${GPT_API_TOKEN}` }),
  },
});

/**
 * Obtiene la lista de GPTs disponibles
 * @returns {Promise<Array>} Lista de GPTs con id y nombre
 */
export const obtenerGPTs = async () => {
  try {
    // Usar el endpoint específico para métricas que devuelve UUIDs
    const response = await apiClient.get('/metrics/gpts');
    
    // El backend devuelve el formato {id, nombre}
    return response.data;
  } catch (error) {
    console.error('Error al obtener GPTs:', error);
    throw error;
  }
};

/**
 * Obtiene la métrica de mensajes por sesión
 * @param {string} gptId - ID del GPT (opcional)
 * @param {Date} fechaInicio - Fecha de inicio para filtrar (opcional)
 * @param {Date} fechaFin - Fecha de fin para filtrar (opcional)
 * @returns {Promise<Array>} Datos de la métrica
 */
export const obtenerMensajesPorSesion = async (gptId, fechaInicio, fechaFin) => {
  try {
    const params = {};
    if (gptId) params.gpt_id = gptId;
    if (fechaInicio) params.fecha_inicio = fechaInicio.toISOString();
    if (fechaFin) params.fecha_fin = fechaFin.toISOString();

    const response = await apiClient.get('/metrics/messages-per-session', { params });
    return response.data;
  } catch (error) {
    console.error('Error al obtener mensajes por sesión:', error);
    throw error;
  }
};

/**
 * Obtiene la métrica de tiempo promedio de respuesta
 * @param {string} gptId - ID del GPT (opcional)
 * @param {Date} fechaInicio - Fecha de inicio para filtrar (opcional)
 * @param {Date} fechaFin - Fecha de fin para filtrar (opcional)
 * @returns {Promise<Array>} Datos de la métrica
 */
export const obtenerTiempoRespuesta = async (gptId, fechaInicio, fechaFin) => {
  try {
    const params = {};
    if (gptId) params.gpt_id = gptId;
    if (fechaInicio) params.fecha_inicio = fechaInicio.toISOString();
    if (fechaFin) params.fecha_fin = fechaFin.toISOString();

    const response = await apiClient.get('/metrics/response-time', { params });
    return response.data;
  } catch (error) {
    console.error('Error al obtener tiempo de respuesta:', error);
    throw error;
  }
};

/**
 * Obtiene la métrica de duración de sesiones
 * @param {string} gptId - ID del GPT (opcional)
 * @param {Date} fechaInicio - Fecha de inicio para filtrar (opcional)
 * @param {Date} fechaFin - Fecha de fin para filtrar (opcional)
 * @returns {Promise<Array>} Datos de la métrica
 */
export const obtenerDuracionSesiones = async (gptId, fechaInicio, fechaFin) => {
  try {
    const params = {};
    if (gptId) params.gpt_id = gptId;
    if (fechaInicio) params.fecha_inicio = fechaInicio.toISOString();
    if (fechaFin) params.fecha_fin = fechaFin.toISOString();

    const response = await apiClient.get('/metrics/session-duration', { params });
    return response.data;
  } catch (error) {
    console.error('Error al obtener duración de sesiones:', error);
    throw error;
  }
};

/**
 * Obtiene la métrica de recuento de sesiones
 * @param {string} gptId - ID del GPT (opcional)
 * @param {Date} fechaInicio - Fecha de inicio para filtrar (opcional)
 * @param {Date} fechaFin - Fecha de fin para filtrar (opcional)
 * @param {number} dias - Número de días a mostrar (por defecto 30)
 * @returns {Promise<Array>} Datos de la métrica
 */
export const obtenerRecuentoSesiones = async (gptId, fechaInicio, fechaFin, dias = 30) => {
  try {
    const params = { dias };
    if (gptId) params.gpt_id = gptId;
    if (fechaInicio) params.fecha_inicio = fechaInicio.toISOString();
    if (fechaFin) params.fecha_fin = fechaFin.toISOString();

    const response = await apiClient.get('/metrics/sessions-count', { params });
    return response.data;
  } catch (error) {
    console.error('Error al obtener recuento de sesiones:', error);
    throw error;
  }
};
