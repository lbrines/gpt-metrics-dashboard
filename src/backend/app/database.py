# Dashboard de Métricas para GPTs Personalizados
# Autor: Equipo DevOps
# Propósito: Configuración de la conexión a la base de datos

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from .config import configuracion

# Crear motor de base de datos
motor_db = create_engine(configuracion.DATABASE_URL)

# Crear fábrica de sesiones
SesionLocal = sessionmaker(autocommit=False, autoflush=False, bind=motor_db)

# Crear base para modelos
Base = declarative_base()

# Dependencia para obtener la sesión de base de datos
def obtener_db():
    """
    Dependencia para obtener una sesión de base de datos.
    Se utiliza como un generador para garantizar que la sesión se cierre después de su uso.
    """
    db = SesionLocal()
    try:
        yield db
    finally:
        db.close()
