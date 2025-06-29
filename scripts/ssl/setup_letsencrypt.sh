#!/bin/bash

# Dashboard de Métricas para GPTs Personalizados
# Script para configurar SSL con Let's Encrypt
# Autor: Equipo DevOps

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuración
DOMAIN="koomtai.com"
EMAIL="leopoldo.brines@gmail.com"
PROJECT_ROOT="/home/lbrines/gpt-metrics-dashboard"
SSL_DIR="$PROJECT_ROOT/ssl"

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

# Verificar que se ejecuta como root
if [[ $EUID -ne 0 ]]; then
   log_message "ERROR" "Este script debe ejecutarse como root"
   exit 1
fi

log_message "INFO" "Configurando SSL con Let's Encrypt para $DOMAIN"

# Instalar certbot si no está instalado
if ! command -v certbot &> /dev/null; then
    log_message "INFO" "Instalando certbot..."
    
    # Actualizar repositorios
    apt update
    
    # Instalar snapd si no está instalado
    if ! command -v snap &> /dev/null; then
        log_message "INFO" "Instalando snapd..."
        apt install -y snapd
        systemctl enable --now snapd.socket
        sleep 5
    fi
    
    # Instalar certbot via snap
    log_message "INFO" "Instalando certbot via snap..."
    snap install core; snap refresh core
    snap install --classic certbot
    
    # Crear enlace simbólico
    ln -sf /snap/bin/certbot /usr/bin/certbot
    
    log_message "SUCCESS" "Certbot instalado correctamente"
else
    log_message "INFO" "Certbot ya está instalado"
fi

# Verificar que el directorio SSL existe
mkdir -p "$SSL_DIR"

# Parar nginx temporalmente para la validación
log_message "INFO" "Deteniendo nginx temporalmente para la validación..."
cd "$PROJECT_ROOT"
docker compose stop nginx

# Obtener certificado SSL
log_message "INFO" "Solicitando certificado SSL para $DOMAIN..."

# Usar certbot standalone para obtener el certificado
certbot certonly \
    --standalone \
    --non-interactive \
    --agree-tos \
    --email "$EMAIL" \
    --domains "$DOMAIN" \
    --expand

if [ $? -eq 0 ]; then
    log_message "SUCCESS" "Certificado SSL obtenido exitosamente"
    
    # Copiar certificados al directorio del proyecto
    log_message "INFO" "Copiando certificados al directorio del proyecto..."
    
    cp "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" "$SSL_DIR/"
    cp "/etc/letsencrypt/live/$DOMAIN/privkey.pem" "$SSL_DIR/"
    cp "/etc/letsencrypt/live/$DOMAIN/chain.pem" "$SSL_DIR/"
    
    # Establecer permisos correctos
    chown -R 1002:1002 "$SSL_DIR"
    chmod 644 "$SSL_DIR/fullchain.pem"
    chmod 644 "$SSL_DIR/chain.pem"
    chmod 600 "$SSL_DIR/privkey.pem"
    
    log_message "SUCCESS" "Certificados copiados y permisos establecidos"
else
    log_message "ERROR" "Error al obtener el certificado SSL"
    exit 1
fi

# Reiniciar nginx
log_message "INFO" "Reiniciando nginx con certificados SSL..."
docker compose start nginx

# Verificar que nginx está funcionando
sleep 5
if docker compose ps nginx | grep -q "Up"; then
    log_message "SUCCESS" "Nginx reiniciado correctamente con SSL"
else
    log_message "ERROR" "Error al reiniciar nginx"
    docker compose logs nginx
    exit 1
fi

# Configurar renovación automática
log_message "INFO" "Configurando renovación automática..."

# Crear script de renovación
cat > /etc/cron.daily/certbot-renew << 'EOF'
#!/bin/bash

# Script de renovación automática de certificados Let's Encrypt
# Para el Dashboard de Métricas GPT

PROJECT_ROOT="/home/lbrines/gpt-metrics-dashboard"
SSL_DIR="$PROJECT_ROOT/ssl"
DOMAIN="koomtai.com"

# Renovar certificados
/usr/bin/certbot renew --quiet --pre-hook "cd $PROJECT_ROOT && docker compose stop nginx" --post-hook "cd $PROJECT_ROOT && docker compose start nginx"

# Copiar certificados actualizados si se renovaron
if [ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
    cp "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" "$SSL_DIR/"
    cp "/etc/letsencrypt/live/$DOMAIN/privkey.pem" "$SSL_DIR/"
    cp "/etc/letsencrypt/live/$DOMAIN/chain.pem" "$SSL_DIR/"
    
    # Establecer permisos
    chown -R 1002:1002 "$SSL_DIR"
    chmod 644 "$SSL_DIR/fullchain.pem"
    chmod 644 "$SSL_DIR/chain.pem"
    chmod 600 "$SSL_DIR/privkey.pem"
    
    # Reiniciar nginx para cargar nuevos certificados
    cd "$PROJECT_ROOT" && docker compose restart nginx
fi
EOF

# Hacer ejecutable el script de renovación
chmod +x /etc/cron.daily/certbot-renew

log_message "SUCCESS" "Renovación automática configurada"

# Probar la configuración SSL
log_message "INFO" "Probando la configuración SSL..."
sleep 10

if curl -I -s "https://$DOMAIN" | grep -q "HTTP/2 200"; then
    log_message "SUCCESS" "¡SSL configurado correctamente!"
    log_message "INFO" "El sitio ahora está disponible en: https://$DOMAIN"
    log_message "INFO" "Los certificados se renovarán automáticamente cada día"
else
    log_message "WARNING" "SSL configurado pero puede haber problemas de conectividad"
    log_message "INFO" "Verifica manualmente: https://$DOMAIN"
fi

# Mostrar información de los certificados
log_message "INFO" "Información de los certificados:"
certbot certificates

log_message "SUCCESS" "Configuración de Let's Encrypt completada"

echo -e "\n${GREEN}=== Configuración SSL Completada ===${NC}"
echo -e "${YELLOW}Dominio:${NC} $DOMAIN"
echo -e "${YELLOW}Email:${NC} $EMAIL"
echo -e "${YELLOW}Certificados:${NC} $SSL_DIR"
echo -e "${YELLOW}Renovación:${NC} Automática (diaria)"
echo -e "${YELLOW}URL:${NC} https://$DOMAIN" 