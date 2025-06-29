#!/bin/bash

echo "=== Diagnóstico de instalación ==="

echo "1. Verificando archivos de Docker Compose:"
ls -la docker-compose*.yml

echo -e "\n2. Verificando comandos Docker:"
echo "docker --version:"
docker --version 2>&1 || echo "docker: no encontrado"

echo "docker-compose --version:"
docker-compose --version 2>&1 || echo "docker-compose: no encontrado"

echo "docker compose version:"
docker compose version 2>&1 || echo "docker compose: no encontrado"

echo -e "\n3. Verificando archivos de configuración de Nginx:"
ls -la nginx/ 2>/dev/null || echo "Directorio nginx/ no encontrado"

echo -e "\n4. Verificando archivo .env:"
ls -la .env 2>/dev/null || echo "Archivo .env no encontrado"

echo -e "\n5. Verificando línea problemática en install_dependencies.sh:"
grep -n "curl.*bash" scripts/setup/install_dependencies.sh || echo "Patrón no encontrado"

echo -e "\n6. Probando configuración de Docker Compose:"
if command -v docker-compose >/dev/null 2>&1; then
    echo "Usando docker-compose:"
    docker-compose config --quiet 2>&1 || echo "Error en docker-compose config"
elif command -v docker >/dev/null 2>&1; then
    echo "Usando docker compose:"
    docker compose config --quiet 2>&1 || echo "Error en docker compose config"
else
    echo "Ni docker ni docker-compose están disponibles"
fi

echo -e "\n7. Contenido del directorio actual:"
pwd
ls -la

echo -e "\n=== Fin del diagnóstico ===" 