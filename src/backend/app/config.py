# Dashboard de Métricas para GPTs Personalizados
# Autor: Equipo DevOps
# Propósito: Configuración de la aplicación

import os
from pydantic_settings import BaseSettings
from typing import List

class Configuracion(BaseSettings):
    """Configuración para la aplicación de dashboard de métricas."""
    
    # Configuración de la base de datos
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://admin:adminpassword@postgres:5432/metricas_gpt")
    
    # Configuración del servidor
    APP_NAME: str = "Dashboard de Métricas GPT"
    DEBUG: bool = os.getenv("DEBUG", "False").lower() == "true"
    
    # Configuración de seguridad
    GPT_API_TOKEN: str = os.getenv("GPT_API_TOKEN", "")
    
    # Configuración de CORS
    @property
    def CORS_ORIGINS(self) -> List[str]:
        origins = os.getenv("CORS_ORIGINS", "http://localhost:3000")
        if not origins:
            return ["http://localhost:3000"]
        return [origin.strip() for origin in origins.split(",")]
    
    class Config:
        env_file = ".env"
        case_sensitive = True

# Crear instancia de configuración
configuracion = Configuracion()
