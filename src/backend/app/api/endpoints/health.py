# Dashboard de Métricas para GPTs Personalizados
# Autor: Equipo DevOps
# Propósito: Endpoint para verificar el estado del servicio

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from ...database import obtener_db

router = APIRouter()

@router.get("/health", status_code=status.HTTP_200_OK)
def verificar_estado(db: Session = Depends(obtener_db)):
    """
    Verifica que la aplicación esté funcionando correctamente y tenga conexión a la base de datos.
    """
    try:
        # Intentar ejecutar una consulta simple para verificar la conexión a la base de datos
        from sqlalchemy import text
        db.execute(text("SELECT 1"))
        return {
            "estado": "OK",
            "mensaje": "El servicio está funcionando correctamente",
            "componentes": {
                "api": "OK",
                "base_de_datos": "OK"
            }
        }
    except Exception as e:
        return {
            "estado": "ERROR",
            "mensaje": f"Error al conectar con la base de datos: {str(e)}",
            "componentes": {
                "api": "OK",
                "base_de_datos": "ERROR"
            }
        }, status.HTTP_500_INTERNAL_SERVER_ERROR
