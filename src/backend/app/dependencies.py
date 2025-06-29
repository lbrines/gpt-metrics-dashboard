# Dashboard de Métricas para GPTs Personalizados
# Autor: Equipo DevOps - Seguridad
# Propósito: Dependencias de seguridad para autenticación de la API

import secrets
from fastapi import HTTPException, Security, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from typing import Optional

from .config import configuracion

# Esquema de seguridad Bearer
security_scheme = HTTPBearer(
    scheme_name="Bearer Token",
    description="Ingresa el token de autenticación para GPTs personalizados"
)

def generar_token_seguro(longitud: int = 64) -> str:
    """
    Genera un token criptográficamente seguro.
    
    Args:
        longitud: Longitud del token en caracteres (por defecto 64)
        
    Returns:
        Token seguro en formato hexadecimal
    """
    return secrets.token_hex(longitud // 2)

async def verificar_token_gpt(
    credentials: HTTPAuthorizationCredentials = Security(security_scheme)
) -> str:
    """
    Dependencia de FastAPI que verifica el token de autenticación.
    
    Args:
        credentials: Credenciales HTTP Bearer del header Authorization
        
    Returns:
        Token verificado
        
    Raises:
        HTTPException: Si el token es inválido o falta
    """
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token de autenticación requerido",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    token = credentials.credentials
    
    # Verificar que el token no esté vacío
    if not token or token.strip() == "":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token de autenticación inválido",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Comparar con el token configurado
    if not configuracion.GPT_API_TOKEN:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Token de API no configurado en el servidor",
        )
    
    # Comparación segura contra timing attacks
    if not secrets.compare_digest(token, configuracion.GPT_API_TOKEN):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token de autenticación inválido",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return token

# Dependencia opcional para endpoints que pueden ser públicos
async def verificar_token_gpt_opcional(
    request: Optional[HTTPAuthorizationCredentials] = None
) -> Optional[str]:
    """
    Dependencia opcional que permite acceso sin token pero lo verifica si está presente.
    
    Args:
        request: Credenciales HTTP Bearer opcionales
        
    Returns:
        Token verificado o None si no se proporciona
        
    Raises:
        HTTPException: Solo si el token está presente pero es inválido
    """
    if not request:
        return None
    
    # Si se proporciona token, debe ser válido
    return await verificar_token_gpt(request)

def validar_configuracion_token() -> bool:
    """
    Valida que el token esté configurado correctamente.
    
    Returns:
        True si el token es válido, False en caso contrario
    """
    if not configuracion.GPT_API_TOKEN:
        return False
    
    # Verificar longitud mínima (recomendado: al menos 32 caracteres)
    if len(configuracion.GPT_API_TOKEN) < 32:
        return False
    
    return True 