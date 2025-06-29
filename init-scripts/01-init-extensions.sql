-- Inicialización de la base de datos para el dashboard de métricas GPT
-- Instalación de la extensión pgcrypto para generar UUIDs

-- Crear extensión pgcrypto para usar gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Crear las tablas principales
CREATE TABLE IF NOT EXISTS gpts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sesiones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gpt_id UUID NOT NULL REFERENCES gpts(id),
    usuario_id VARCHAR(255),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ended_at TIMESTAMP WITH TIME ZONE,
    duracion_ms INTEGER,
    CONSTRAINT fk_gpt FOREIGN KEY (gpt_id) REFERENCES gpts(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS eventos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sesion_id UUID NOT NULL,
    tipo VARCHAR(50) NOT NULL, -- 'user_message', 'response', etc.
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    contenido TEXT,
    latency_ms INTEGER,
    tokens_entrada INTEGER,
    tokens_salida INTEGER,
    CONSTRAINT fk_sesion FOREIGN KEY (sesion_id) REFERENCES sesiones(id) ON DELETE CASCADE
);

-- Insertar algunos datos de prueba
INSERT INTO gpts (nombre, descripcion) VALUES
    ('GPT Asistente', 'Asistente general para tareas variadas'),
    ('GPT Programador', 'Especializado en ayudar con código y programación'),
    ('GPT Educativo', 'Enfocado en explicar conceptos académicos');

-- Índices para mejorar el rendimiento de las consultas
CREATE INDEX idx_sesiones_gpt_id ON sesiones(gpt_id);
CREATE INDEX idx_sesiones_fecha ON sesiones(started_at);
CREATE INDEX idx_eventos_sesion_id ON eventos(sesion_id);
CREATE INDEX idx_eventos_tipo ON eventos(tipo);
