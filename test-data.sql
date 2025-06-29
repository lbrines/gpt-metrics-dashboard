-- Dashboard de Métricas para GPTs Personalizados
-- Autor: Equipo DevOps
-- Propósito: Datos de prueba para el dashboard

-- Insertar el GPT de prueba con UUID
INSERT INTO gpts (id, nombre, descripcion) 
VALUES ('a1b2c3d4-e5f6-47a8-b9c0-d1e2f3a4b5c6', 'Dummy Advisor GPT', 'Asistente de ejemplo para pruebas de métricas')
ON CONFLICT (id) DO UPDATE 
  SET nombre = EXCLUDED.nombre, 
      descripcion = EXCLUDED.descripcion;

-- Insertar un segundo GPT para Cannabis Advisor
INSERT INTO gpts (id, nombre, descripcion) 
VALUES ('b2c3d4e5-f6a7-48b9-90d1-e2f3a4b5c6d7', 'Cannabis Cultivation Advisor', 'Asistente especializado en cultivo de cannabis')
ON CONFLICT (id) DO UPDATE 
  SET nombre = EXCLUDED.nombre, 
      descripcion = EXCLUDED.descripcion;

-- Insertar sesiones de prueba con nombres de columnas corregidos y duración en milisegundos
INSERT INTO sesiones (id, gpt_id, started_at, ended_at, usuario_id, duracion_ms) VALUES 
('8f7e6d5c-4b3a-2a1b-0c9d-8e7f6a5b4c3d', 'a1b2c3d4-e5f6-47a8-b9c0-d1e2f3a4b5c6', '2025-06-20T08:45:23-03:00', '2025-06-20T08:47:12-03:00', 'user_test_1', 109000),
('1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d', 'a1b2c3d4-e5f6-47a8-b9c0-d1e2f3a4b5c6', '2025-06-21T14:30:15-03:00', '2025-06-21T14:31:25-03:00', 'user_test_2', 70000),
('7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e', 'a1b2c3d4-e5f6-47a8-b9c0-d1e2f3a4b5c6', '2025-06-22T10:15:47-03:00', '2025-06-22T10:19:18-03:00', 'user_test_3', 211000),
('3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'a1b2c3d4-e5f6-47a8-b9c0-d1e2f3a4b5c6', '2025-06-23T16:05:33-03:00', '2025-06-23T16:06:48-03:00', 'user_test_1', 75000),
('9a0b1c2d-3e4f-5a6b-7c8d-9e0f1a2b3c4d', 'a1b2c3d4-e5f6-47a8-b9c0-d1e2f3a4b5c6', '2025-06-24T07:10:05-03:00', '2025-06-24T07:12:41-03:00', 'user_test_2', 156000)
ON CONFLICT (id) DO NOTHING;

-- Insertar sesiones para el segundo GPT (con UUIDs válidos y duración en milisegundos)
INSERT INTO sesiones (id, gpt_id, started_at, ended_at, usuario_id, duracion_ms) VALUES 
('4d5e6f7a-8b9c-40d1-82e3-f4a5b6c7d8e9', 'b2c3d4e5-f6a7-48b9-90d1-e2f3a4b5c6d7', '2025-06-20T09:15:23-03:00', '2025-06-20T09:20:12-03:00', 'user_test_3', 289000),
('5e6f7a8b-9c0d-41e2-93f4-a5b6c7d8e9f0', 'b2c3d4e5-f6a7-48b9-90d1-e2f3a4b5c6d7', '2025-06-22T11:30:15-03:00', '2025-06-22T11:35:25-03:00', 'user_test_1', 310000)
ON CONFLICT (id) DO NOTHING;

-- Insertar eventos de prueba
INSERT INTO eventos (sesion_id, tipo, timestamp, contenido, latency_ms, tokens_entrada, tokens_salida) VALUES
-- Sesión 1
('8f7e6d5c-4b3a-2a1b-0c9d-8e7f6a5b4c3d', 'user_message', '2025-06-20T08:45:30-03:00', 'Pregunta del usuario 1', NULL, 85, NULL),
('8f7e6d5c-4b3a-2a1b-0c9d-8e7f6a5b4c3d', 'response', '2025-06-20T08:45:38-03:00', 'Respuesta del GPT 1', 820, NULL, 154),
('8f7e6d5c-4b3a-2a1b-0c9d-8e7f6a5b4c3d', 'user_message', '2025-06-20T08:46:20-03:00', 'Pregunta del usuario 2', NULL, 42, NULL),
('8f7e6d5c-4b3a-2a1b-0c9d-8e7f6a5b4c3d', 'response', '2025-06-20T08:46:25-03:00', 'Respuesta del GPT 2', 490, NULL, 110),
('8f7e6d5c-4b3a-2a1b-0c9d-8e7f6a5b4c3d', 'user_message', '2025-06-20T08:47:05-03:00', 'Pregunta del usuario 3', NULL, 63, NULL),
('8f7e6d5c-4b3a-2a1b-0c9d-8e7f6a5b4c3d', 'response', '2025-06-20T08:47:12-03:00', 'Respuesta del GPT 3', 680, NULL, 175),

-- Sesión 2
('1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d', 'user_message', '2025-06-21T14:30:22-03:00', 'Pregunta del usuario 1', NULL, 120, NULL),
('1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d', 'response', '2025-06-21T14:30:32-03:00', 'Respuesta del GPT 1', 980, NULL, 185),
('1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d', 'user_message', '2025-06-21T14:31:15-03:00', 'Pregunta del usuario 2', NULL, 55, NULL),
('1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d', 'response', '2025-06-21T14:31:25-03:00', 'Respuesta del GPT 2', 1050, NULL, 198),

-- Sesión 3
('7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e', 'user_message', '2025-06-22T10:15:55-03:00', 'Pregunta del usuario 1', NULL, 92, NULL),
('7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e', 'response', '2025-06-22T10:16:05-03:00', 'Respuesta del GPT 1', 1200, NULL, 167),
('7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e', 'user_message', '2025-06-22T10:16:45-03:00', 'Pregunta del usuario 2', NULL, 78, NULL),
('7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e', 'response', '2025-06-22T10:16:57-03:00', 'Respuesta del GPT 2', 1100, NULL, 143),
('7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e', 'user_message', '2025-06-22T10:18:10-03:00', 'Pregunta del usuario 3', NULL, 25, NULL),
('7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e', 'response', '2025-06-22T10:18:15-03:00', 'Respuesta del GPT 3', 560, NULL, 88),
('7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e', 'user_message', '2025-06-22T10:19:05-03:00', 'Pregunta del usuario 4', NULL, 103, NULL),
('7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e', 'response', '2025-06-22T10:19:18-03:00', 'Respuesta del GPT 4', 1350, NULL, 215),

-- Sesión 4
('3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'user_message', '2025-06-23T16:05:45-03:00', 'Pregunta del usuario 1', NULL, 68, NULL),
('3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'response', '2025-06-23T16:05:54-03:00', 'Respuesta del GPT 1', 920, NULL, 145),
('3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'user_message', '2025-06-23T16:06:35-03:00', 'Pregunta del usuario 2', NULL, 95, NULL),
('3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'response', '2025-06-23T16:06:48-03:00', 'Respuesta del GPT 2', 1280, NULL, 190),

-- Sesión 5
('9a0b1c2d-3e4f-5a6b-7c8d-9e0f1a2b3c4d', 'user_message', '2025-06-24T07:10:15-03:00', 'Pregunta del usuario 1', NULL, 47, NULL),
('9a0b1c2d-3e4f-5a6b-7c8d-9e0f1a2b3c4d', 'response', '2025-06-24T07:10:22-03:00', 'Respuesta del GPT 1', 750, NULL, 120),
('9a0b1c2d-3e4f-5a6b-7c8d-9e0f1a2b3c4d', 'user_message', '2025-06-24T07:11:05-03:00', 'Pregunta del usuario 2', NULL, 72, NULL),
('9a0b1c2d-3e4f-5a6b-7c8d-9e0f1a2b3c4d', 'response', '2025-06-24T07:11:15-03:00', 'Respuesta del GPT 2', 980, NULL, 165),
('9a0b1c2d-3e4f-5a6b-7c8d-9e0f1a2b3c4d', 'user_message', '2025-06-24T07:12:30-03:00', 'Pregunta del usuario 3', NULL, 81, NULL),
('9a0b1c2d-3e4f-5a6b-7c8d-9e0f1a2b3c4d', 'response', '2025-06-24T07:12:41-03:00', 'Respuesta del GPT 3', 1100, NULL, 183),

-- Sesiones para Cannabis Advisor (con UUIDs válidos)
('4d5e6f7a-8b9c-40d1-82e3-f4a5b6c7d8e9', 'user_message', '2025-06-20T09:15:30-03:00', 'Pregunta sobre cultivo indoor', NULL, 90, NULL),
('4d5e6f7a-8b9c-40d1-82e3-f4a5b6c7d8e9', 'response', '2025-06-20T09:15:38-03:00', 'Respuesta sobre iluminación y nutrientes', 850, NULL, 180),
('4d5e6f7a-8b9c-40d1-82e3-f4a5b6c7d8e9', 'user_message', '2025-06-20T09:18:20-03:00', 'Problema con hojas amarillas', NULL, 60, NULL),
('4d5e6f7a-8b9c-40d1-82e3-f4a5b6c7d8e9', 'response', '2025-06-20T09:19:25-03:00', 'Diagnóstico de deficiencia nutricional', 1050, NULL, 220),

('5e6f7a8b-9c0d-41e2-93f4-a5b6c7d8e9f0', 'user_message', '2025-06-22T11:30:22-03:00', 'Consulta sobre tiempo de floración', NULL, 75, NULL),
('5e6f7a8b-9c0d-41e2-93f4-a5b6c7d8e9f0', 'response', '2025-06-22T11:31:35-03:00', 'Explicación de factores de floración', 1120, NULL, 245),
('5e6f7a8b-9c0d-41e2-93f4-a5b6c7d8e9f0', 'user_message', '2025-06-22T11:33:15-03:00', 'Mejor método de riego', NULL, 45, NULL),
('5e6f7a8b-9c0d-41e2-93f4-a5b6c7d8e9f0', 'response', '2025-06-22T11:34:20-03:00', 'Comparación de sistemas de riego', 980, NULL, 210);
