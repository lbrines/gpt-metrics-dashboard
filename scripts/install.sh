#!/bin/bash

# Exit on error
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
DOMAIN=${DOMAIN:-localhost}
DB_USER=${DB_USER:-dashboard_user}
DB_PASS=${DB_PASS:-$(openssl rand -hex 16)}
DB_NAME=${DB_NAME:-dashboard_metrics}
INSTALL_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
PROJECT_ROOT=$(dirname "$INSTALL_DIR")

# Create logs directory
LOG_DIR="$PROJECT_ROOT/logs"
mkdir -p "$LOG_DIR"

# Function to log messages
log_message() {
    local level=$1
    local message=$2
    local timestamp=$(date +"%Y-%m-%d %H:%M:%S")
    local log_file="$LOG_DIR/installation-$(date +%Y%m%d).log"
    
    case $level in
        "INFO") color=$BLUE ;;
        "SUCCESS") color=$GREEN ;;
        "WARNING") color=$YELLOW ;;
        "ERROR") color=$RED ;;
        *) color=$NC ;;
    esac
    
    echo -e "${color}[${timestamp}] [${level}] ${message}${NC}" | tee -a "$log_file"
}

# Function to handle errors
error_exit() {
    log_message "ERROR" "$1"
    exit 1
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to prompt for confirmation
confirm() {
    local prompt="$1"
    local default="${2:-y}"
    
    if [ "$default" = "y" ]; then
        prompt="$prompt [Y/n] "
    else
        prompt="$prompt [y/N] "
    fi
    
    read -r -p "$prompt" response
    case $response in
        [yY][eE][sS]|[yY]) 
            return 0
            ;;
        [nN][oO]|[nN])
            return 1
            ;;
        *)
            if [ "$default" = "y" ]; then
                return 0
            else
                return 1
            fi
            ;;
    esac
}

# Function to run a script with logging
run_script() {
    local script_name="$1"
    local script_path="$INSTALL_DIR/$script_name"
    local log_file="$LOG_DIR/$(basename "$script_name" .sh).log"
    
    if [ ! -f "$script_path" ]; then
        log_message "ERROR" "Script not found: $script_path"
        return 1
    fi
    
    log_message "INFO" "Running $script_name..."
    chmod +x "$script_path"
    
    # Run the script and capture output
    if "$script_path" 2>&1 | tee "$log_file"; then
        log_message "SUCCESS" "$script_name completed successfully"
        return 0
    else
        log_message "ERROR" "$script_name failed. Check $log_file for details."
        return 1
    fi
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    log_message "WARNING" "This script requires root privileges for some operations."
    if ! confirm "Do you want to continue?" "n"; then
        exit 1
    fi
    SUDO_CMD="sudo"
else
    SUDO_CMD=""
fi

# Welcome message
echo -e "${GREEN}=== Dashboard Metrics Installation ===${NC}"
echo -e "Installation directory: ${YELLOW}${INSTALL_DIR}${NC}"
echo -e "Project root: ${YELLOW}${PROJECT_ROOT}${NC}"
echo -e "Domain: ${YELLOW}${DOMAIN}${NC}"
echo -e "Database User: ${YELLOW}${DB_USER}${NC}"
echo -e "Database Name: ${YELLOW}${DB_NAME}${NC}"

# Check for required commands
for cmd in docker docker-compose openssl; do
    if ! command_exists "$cmd"; then
        log_message "WARNING" "$cmd is not installed. It will be installed if you continue."
    fi
done

# Create .env file if it doesn't exist
ENV_FILE="$PROJECT_ROOT/.env"
if [ ! -f "$ENV_FILE" ]; then
    log_message "INFO" "Creating .env file with default values"
    cat > "$ENV_FILE" <<EOL
# Application Environment
APP_ENV=production
SECRET_KEY=$(openssl rand -hex 32)

# Database
DB_USER=${DB_USER}
DB_PASS=${DB_PASS}
DB_NAME=${DB_NAME}
DB_HOST=postgres
DB_PORT=5432
DATABASE_URL=postgresql://${DB_USER}:${DB_PASS}@postgres:5432/${DB_NAME}

# Frontend
VITE_API_URL=${DOMAIN}
NODE_ENV=production

# Domain
DOMAIN=${DOMAIN}

# Email (for Let's Encrypt and notifications)
EMAIL=${EMAIL:-admin@${DOMAIN#www.}}

# Logging
LOG_LEVEL=INFO
LOG_FORMAT=json

# CORS (comma-separated list of allowed origins)
CORS_ORIGINS=http://localhost:3000,http://localhost:8000,https://${DOMAIN}

# Rate Limiting (requests per minute per IP)
RATE_LIMIT=100

# Session Configuration
SESSION_SECRET=$(openssl rand -hex 32)
SESSION_MAX_AGE=86400  # 1 day in seconds

# Security Headers
SECURE_HEADERS_ENABLED=true
CSP_ENABLED=true
EOL
else
    log_message "INFO" "Using existing .env file at $ENV_FILE"
    # Update existing .env with any missing variables
    grep -q "^SECRET_KEY=" "$ENV_FILE" || echo "SECRET_KEY=$(openssl rand -hex 32)" >> "$ENV_FILE"
    grep -q "^DB_USER=" "$ENV_FILE" || echo "DB_USER=${DB_USER}" >> "$ENV_FILE"
    grep -q "^DB_PASS=" "$ENV_FILE" || echo "DB_PASS=${DB_PASS}" >> "$ENV_FILE"
    grep -q "^DB_NAME=" "$ENV_FILE" || echo "DB_NAME=${DB_NAME}" >> "$ENV_FILE"
    grep -q "^DOMAIN=" "$ENV_FILE" || echo "DOMAIN=${DOMAIN}" >> "$ENV_FILE"
    grep -q "^SESSION_SECRET=" "$ENV_FILE" || echo "SESSION_SECRET=$(openssl rand -hex 32)" >> "$ENV_FILE"
    
    # Cargar el archivo .env, manejando correctamente comentarios y caracteres especiales
    set -a
    # Cargar solo líneas que parezcan asignaciones de variables
    while IFS= read -r line || [ -n "$line" ]; do
        # Eliminar comentarios (todo lo que vaya después de #)
        line_clean=${line%%#*}
        # Eliminar espacios en blanco al inicio y final
        line_clean=$(echo "$line_clean" | xargs)
        
        # Si la línea resultante es una asignación de variable (formato KEY=VALUE)
        if [[ "$line_clean" =~ ^[[:alnum:]_]+= ]]; then
            # Exportar la variable
            export "$line_clean" 2>/dev/null || \
                log_message "WARNING" "No se pudo exportar: $line_clean"
        fi
    done < "$ENV_FILE"
    set +a
fi

# Create data directories
log_message "INFO" "Creating data directories..."
mkdir -p "$PROJECT_ROOT/data/db"
mkdir -p "$PROJECT_ROOT/data/backups"
mkdir -p "$PROJECT_ROOT/init-scripts"

# Create a simple init script if it doesn't exist
if [ ! -f "$PROJECT_ROOT/init-scripts/01-init-extensions.sql" ]; then
    log_message "INFO" "Creating database initialization script..."
    cat > "$PROJECT_ROOT/init-scripts/01-init-extensions.sql" <<EOL
-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
EOL
fi

# Install dependencies
log_message "INFO" "Installing system dependencies..."
run_script "setup/install_dependencies.sh" || error_exit "Failed to install dependencies"

# Setup database
log_message "INFO" "Setting up database..."
run_script "db/setup_db.sh" || error_exit "Failed to setup database"

# Configure firewall
log_message "INFO" "Configuring firewall..."
run_script "setup/configure_firewall.sh" || error_exit "Failed to configure firewall"

# Configure Nginx
log_message "INFO" "Configuring Nginx..."
run_script "setup/configure_nginx.sh" || error_exit "Failed to configure Nginx"

# Configure SSL if not localhost
if [ "$DOMAIN" != "localhost" ]; then
    log_message "INFO" "Configuring SSL for domain: ${DOMAIN}"
    if [ -f "$INSTALL_DIR/ssl/configure_ssl.sh" ]; then
        run_script "ssl/configure_ssl.sh" || error_exit "Failed to configure SSL"
    else
        log_message "WARNING" "SSL configuration script not found. Skipping SSL setup."
    fi
else
    log_message "INFO" "Skipping SSL configuration for localhost"
fi

# Build and start services
log_message "INFO" "Building and starting services..."
cd "$PROJECT_ROOT" || error_exit "Failed to change to project root directory"

# Build the Docker images
log_message "INFO" "Building Docker images..."
docker compose build || error_exit "Failed to build Docker images"

# Start the services
if [ "$DOMAIN" != "localhost" ] && [ -f "docker-compose.prod.yml" ]; then
    log_message "INFO" "Starting production services..."
    docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d || error_exit "Failed to start services"
else
    log_message "INFO" "Starting development services..."
    docker compose up -d || error_exit "Failed to start services"
fi

# Wait for services to start
log_message "INFO" "Waiting for services to start..."
sleep 10

# Run database migrations if needed
if [ -f "src/backend/alembic.ini" ]; then
    log_message "INFO" "Running database migrations..."
    docker compose exec backend alembic upgrade head || log_message "WARNING" "Failed to run database migrations"
fi

# Run tests
log_message "INFO" "Running installation tests..."
if [ -f "$INSTALL_DIR/test/test_installation.sh" ]; then
    run_script "test/test_installation.sh" || log_message "WARNING" "Some installation tests failed"
else
    log_message "WARNING" "Test script not found. Skipping tests."
fi

# Show completion message
echo -e "\n${GREEN}=== Installation completed successfully! ===${NC}"
echo -e "\n${YELLOW}Next steps:${NC}"
echo "1. Access the dashboard at: http${DOMAIN#localhost}${DOMAIN+/}"
echo "2. Check the logs: docker compose logs -f"
echo "3. Set up automatic backups: $INSTALL_DIR/db/backup_db.sh"
echo -e "\n${YELLOW}Important:${NC}"
echo "- Database credentials are stored in $ENV_FILE"
echo "- Make sure to keep your .env file secure and back it up"
echo "- For production, ensure you have proper monitoring and alerting in place"

log_message "SUCCESS" "Installation completed successfully"

# Save credentials to file
cat > credentials.txt <<EOL
=== Dashboard Metrics Credentials ===
Database:
  User: $DB_USER
  Password: $DB_PASS
  Database: $DB_NAME
  Host: localhost
  Port: 5432

Make sure to save these credentials in a secure location!
EOL

echo -e "${YELLOW}Database credentials have been saved to credentials.txt${NC}"
