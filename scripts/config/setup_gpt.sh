#!/bin/bash

# Dashboard de Métricas para GPTs Personalizados
# Script para configurar un nuevo GPT
# Autor: Equipo DevOps

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para logging
log_message() {
    local level=$1
    local message=$2
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    
    case $level in
        "INFO")
            echo -e "${BLUE}[$timestamp] [INFO]${NC} $message"
            ;;
        "SUCCESS")
            echo -e "${GREEN}[$timestamp] [SUCCESS]${NC} $message"
            ;;
        "WARNING")
            echo -e "${YELLOW}[$timestamp] [WARNING]${NC} $message"
            ;;
        "ERROR")
            echo -e "${RED}[$timestamp] [ERROR]${NC} $message"
            ;;
    esac
}

# Función para mostrar ayuda
show_help() {
    echo -e "${GREEN}=== Configurador de GPTs ===${NC}"
    echo -e "${YELLOW}Uso:${NC} $0 [OPCIÓN]"
    echo ""
    echo -e "${YELLOW}Opciones:${NC}"
    echo "  add     Agregar un nuevo GPT"
    echo "  list    Listar GPTs configurados"
    echo "  remove  Eliminar un GPT"
    echo "  help    Mostrar esta ayuda"
    echo ""
    echo -e "${YELLOW}Ejemplos:${NC}"
    echo "  $0 add"
    echo "  $0 list"
    echo "  $0 remove devops-expert"
}

# Función para validar código de GPT
validate_gpt_code() {
    local code=$1
    
    # Solo letras minúsculas, números y guiones
    if [[ ! $code =~ ^[a-z0-9-]+$ ]]; then
        log_message "ERROR" "El código debe contener solo letras minúsculas, números y guiones"
        return 1
    fi
    
    # No puede empezar o terminar con guión
    if [[ $code =~ ^-|-$ ]]; then
        log_message "ERROR" "El código no puede empezar o terminar con guión"
        return 1
    fi
    
    return 0
}

# Función para listar GPTs
list_gpts() {
    local config_file="src/backend/app/config/gpts.json"
    
    if [[ ! -f "$config_file" ]]; then
        log_message "WARNING" "No se encontró el archivo de configuración"
        return 1
    fi
    
    log_message "INFO" "GPTs configurados:"
    echo ""
    
    # Usar jq si está disponible, sino usar método básico
    if command -v jq &> /dev/null; then
        jq -r '.[] | "  \(.code) - \(.name)"' "$config_file"
    else
        # Método básico sin jq
        grep -E '"code"|"name"' "$config_file" | sed 'N;s/\n/ /' | \
        sed 's/.*"code": *"\([^"]*\)".*"name": *"\([^"]*\)".*/  \1 - \2/'
    fi
    
    echo ""
}

# Función para agregar GPT
add_gpt() {
    local config_file="src/backend/app/config/gpts.json"
    
    echo -e "${GREEN}=== Agregar Nuevo GPT ===${NC}"
    echo ""
    
    # Solicitar código del GPT
    while true; do
        read -p "Código del GPT (ej: devops-expert): " gpt_code
        
        if [[ -z "$gpt_code" ]]; then
            log_message "ERROR" "El código no puede estar vacío"
            continue
        fi
        
        if validate_gpt_code "$gpt_code"; then
            break
        fi
    done
    
    # Solicitar nombre del GPT
    while true; do
        read -p "Nombre del GPT (ej: DevOps Expert): " gpt_name
        
        if [[ -z "$gpt_name" ]]; then
            log_message "ERROR" "El nombre no puede estar vacío"
            continue
        fi
        
        break
    done
    
    # Verificar si el archivo existe
    if [[ ! -f "$config_file" ]]; then
        log_message "INFO" "Creando archivo de configuración..."
        mkdir -p "$(dirname "$config_file")"
        echo "[]" > "$config_file"
    fi
    
    # Verificar si el GPT ya existe
    if grep -q "\"$gpt_code\"" "$config_file"; then
        log_message "ERROR" "El GPT con código '$gpt_code' ya existe"
        return 1
    fi
    
    # Crear entrada temporal
    local temp_entry="{\"code\": \"$gpt_code\", \"name\": \"$gpt_name\"}"
    
    # Agregar al archivo
    if command -v jq &> /dev/null; then
        # Usar jq si está disponible
        local temp_file=$(mktemp)
        jq ". += [$temp_entry]" "$config_file" > "$temp_file"
        mv "$temp_file" "$config_file"
    else
        # Método básico sin jq
        local temp_file=$(mktemp)
        
        # Leer el archivo actual y agregar la nueva entrada
        if [[ $(wc -l < "$config_file") -eq 1 ]] && grep -q "^\[\]$" "$config_file"; then
            # Archivo vacío
            echo "[$temp_entry]" > "$temp_file"
        else
            # Archivo con contenido
            sed '$s/]$/,/' "$config_file" > "$temp_file"
            echo "  $temp_entry" >> "$temp_file"
            echo "]" >> "$temp_file"
        fi
        
        mv "$temp_file" "$config_file"
    fi
    
    log_message "SUCCESS" "GPT '$gpt_name' agregado correctamente"
    
    # Mostrar información de integración
    echo ""
    echo -e "${YELLOW}=== Información de Integración ===${NC}"
    echo -e "${BLUE}Código del GPT:${NC} $gpt_code"
    echo -e "${BLUE}URL del Dashboard:${NC} https://koomtai.com"
    echo -e "${BLUE}Endpoint para métricas:${NC} https://koomtai.com/api"
    echo ""
    echo -e "${YELLOW}Para enviar métricas desde tu GPT, usa este código:${NC}"
    echo ""
    echo -e "${GREEN}# Ejemplo de envío de métricas${NC}"
    echo "curl -X POST https://koomtai.com/api/sessions \\"
    echo "  -H \"Content-Type: application/json\" \\"
    echo "  -d '{"
    echo "    \"gpt_id\": \"$gpt_code\","
    echo "    \"usuario_id\": \"usuario123\","
    echo "    \"timestamp_inicio\": \"$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)\""
    echo "  }'"
    echo ""
}

# Función para eliminar GPT
remove_gpt() {
    local gpt_code=$1
    local config_file="src/backend/app/config/gpts.json"
    
    if [[ -z "$gpt_code" ]]; then
        read -p "Código del GPT a eliminar: " gpt_code
    fi
    
    if [[ ! -f "$config_file" ]]; then
        log_message "ERROR" "No se encontró el archivo de configuración"
        return 1
    fi
    
    # Verificar si el GPT existe
    if ! grep -q "\"$gpt_code\"" "$config_file"; then
        log_message "ERROR" "No se encontró el GPT con código '$gpt_code'"
        return 1
    fi
    
    # Confirmar eliminación
    read -p "¿Estás seguro de que quieres eliminar el GPT '$gpt_code'? (y/N): " confirm
    
    if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
        log_message "INFO" "Operación cancelada"
        return 0
    fi
    
    # Eliminar usando jq si está disponible
    if command -v jq &> /dev/null; then
        local temp_file=$(mktemp)
        jq "map(select(.code != \"$gpt_code\"))" "$config_file" > "$temp_file"
        mv "$temp_file" "$config_file"
    else
        log_message "ERROR" "Se requiere 'jq' para eliminar GPTs. Instálalo con: sudo apt install jq"
        return 1
    fi
    
    log_message "SUCCESS" "GPT '$gpt_code' eliminado correctamente"
}

# Función principal
main() {
    local action=${1:-help}
    
    case $action in
        "add")
            add_gpt
            ;;
        "list")
            list_gpts
            ;;
        "remove")
            remove_gpt "$2"
            ;;
        "help"|*)
            show_help
            ;;
    esac
}

# Ejecutar función principal
main "$@" 