#!/usr/bin/env bash
# Dashboard de Métricas para GPTs Personalizados
# Autor: Equipo DevOps
# Propósito: Script para verificar el estado de los servicios

# Colores para la salida
VERDE='\033[0;32m'
AMARILLO='\033[1;33m'
ROJO='\033[0;31m'
NC='\033[0m' # Sin Color

# Función para verificar si un comando existe
comando_existe() {
    command -v "$1" >/dev/null 2>&1
}

# Función para verificar si un puerto está en uso
puerto_en_uso() {
    netstat -tuln 2>/dev/null | grep -q ":$1 "
}

echo -e "${AMARILLO}=== Verificación del Sistema ===${NC}"

# Verificar Docker
if comando_existe docker; then
    echo -e "${VERDE}✓ Docker está instalado${NC}"
    docker --version
else
    echo -e "${ROJO}✗ Docker no está instalado${NC}"
fi

# Verificar Docker Compose
if comando_existe docker-compose; then
    echo -e "${VERDE}✓ Docker Compose está instalado${NC}"
    docker-compose --version
else
    echo -e "${ROJO}✗ Docker Compose no está instalado${NC}"
fi

# Verificar servicios en ejecución
echo -e "\n${AMARILLO}=== Verificación de Servicios ===${NC}"

# Verificar PostgreSQL
if puerto_en_uso 5432; then
    echo -e "${VERDE}✓ PostgreSQL está en ejecución${NC}
"
else
    echo -e "${ROJO}✗ PostgreSQL no está en ejecución${NC}"
fi

# Verificar Backend
if puerto_en_uso 8000; then
    echo -e "${VERDE}✓ Backend (puerto 8000) está en ejecución${NC}"
    
    # Probar endpoint de salud
    echo -e "\n${AMARILLO}Probando endpoint de salud...${NC}"
    if curl -s -f http://localhost:8000/health > /dev/null; then
        echo -e "${VERDE}✓ Backend responde correctamente${NC}"
    else
        echo -e "${ROJO}✗ El backend no responde correctamente${NC}"
    fi
else
    echo -e "${ROJO}✗ Backend no está en ejecución${NC}"
fi

# Verificar Frontend
if puerto_en_uso 3000; then
    echo -e "\n${VERDE}✓ Frontend (puerto 3000) está en ejecución${NC}"
    
    # Probar acceso al frontend
    if comando_existe curl; then
        echo -e "\n${AMARILLO}Probando acceso al frontend...${NC}"
        HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 || true)
        if [ "$HTTP_STATUS" = "200" ]; then
            echo -e "${VERDE}✓ Frontend responde correctamente (HTTP 200)${NC}"
        else
            echo -e "${AMARILLO}⚠ Frontend responde con código HTTP $HTTP_STATUS${NC}"
        fi
    fi
else
    echo -e "\n${ROJO}✗ Frontend no está en ejecución${NC}"
fi

# Verificar Nginx
if puerto_en_uso 80 || puerto_en_uso 443; then
    echo -e "\n${VERDE}✓ Nginx está en ejecución${NC}"
    
    # Verificar configuración de Nginx
    if comando_existe nginx; then
        echo -e "\n${AMARILLO}Verificando configuración de Nginx...${NC}"
        if nginx -t > /dev/null 2>&1; then
            echo -e "${VERDE}✓ La configuración de Nginx es válida${NC}"
        else
            echo -e "${ROJO}✗ Error en la configuración de Nginx${NC}"
            nginx -t
        fi
    fi
else
    echo -e "\n${AMARILLO}⚠ Nginx no está en ejecución o no está en los puertos 80/443${NC}"
fi

echo -e "\n${AMARILLO}=== Resumen ===${NC}"

# Mostrar resumen de contenedores en ejecución
if comando_existe docker; then
    echo -e "\n${AMARILLO}Contenedores en ejecución:${NC}"
    docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
fi

echo -e "\n${VERDE}Verificación completada.${NC}"

# Salir con código de error si algún servicio crítico falla
if ! puerto_en_uso 8000 || ! puerto_en_uso 5432; then
    exit 1
fi
