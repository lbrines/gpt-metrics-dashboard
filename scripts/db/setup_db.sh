#!/bin/bash

# Exit on error
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get the directory of this script
SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
PROJECT_ROOT=$(dirname "$(dirname "$SCRIPT_DIR")")
LOG_FILE="$PROJECT_ROOT/logs/db_setup.log"

# Create logs directory if it doesn't exist
mkdir -p "$(dirname "$LOG_FILE")"

# Function to log messages
log_message() {
    local level=$1
    local message=$2
    local timestamp=$(date +"%Y-%m-%d %H:%M:%S")
    
    case $level in
        "INFO") color=$BLUE ;;
        "SUCCESS") color=$GREEN ;;
        "WARNING") color=$YELLOW ;;
        "ERROR") color=$RED ;;
        *) color=$NC ;;
    esac
    
    echo -e "${color}[${timestamp}] [${level}] ${message}${NC}" | tee -a "$LOG_FILE"
}

# Function to check if PostgreSQL command exists
pg_cmd_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check if PostgreSQL is running
pg_is_running() {
    local host=$1
    local port=$2
    
    if pg_cmd_exists "pg_isready"; then
        if pg_isready -h "$host" -p "$port" >/dev/null 2>&1; then
            return 0
        fi
    else
        # Fallback check using netcat
        if command -v nc >/dev/null 2>&1; then
            if nc -z "$host" "$port" >/dev/null 2>&1; then
                return 0
            fi
        fi
    fi
    
    return 1
}

# Function to execute SQL as postgres user
execute_sql() {
    local sql=$1
    local db=${2:-postgres}
    
    if [ "$DB_HOST" = "localhost" ] || [ "$DB_HOST" = "127.0.0.1" ]; then
        # Local connection
        sudo -u postgres psql -d "$db" -c "$sql" >> "$LOG_FILE" 2>&1
    else
        # Remote connection
        PGPASSWORD="$DB_PASS" psql -h "$DB_HOST" -p "$DB_PORT" -U "postgres" -d "$db" -c "$sql" >> "$LOG_FILE" 2>&1
    fi
}

# Function to check if database exists
database_exists() {
    local dbname=$1
    
    if [ "$DB_HOST" = "localhost" ] || [ "$DB_HOST" = "127.0.0.1" ]; then
        sudo -u postgres psql -lqt | cut -d \| -f 1 | grep -qw "$dbname"
    else
        PGPASSWORD="$DB_PASS" psql -h "$DB_HOST" -p "$DB_PORT" -U "postgres" -lqt | cut -d \| -f 1 | grep -qw "$dbname"
    fi
}

# Function to check if user exists
user_exists() {
    local username=$1
    
    if [ "$DB_HOST" = "localhost" ] || [ "$DB_HOST" = "127.0.0.1" ]; then
        sudo -u postgres psql -tAc "SELECT 1 FROM pg_roles WHERE rolname='$username'" | grep -q 1
    else
        PGPASSWORD="$DB_PASS" psql -h "$DB_HOST" -p "$DB_PORT" -U "postgres" -tAc "SELECT 1 FROM pg_roles WHERE rolname='$username'" | grep -q 1
    fi
}

# Main function
main() {
    log_message "INFO" "=== Starting Database Setup ==="
    
    # Check if running as root
    if [ "$EUID" -ne 0 ] && [ "$DB_HOST" = "localhost" ]; then 
        log_message "ERROR" "This script must be run as root for local PostgreSQL setup"
        exit 1
    fi
    
    # Source environment variables
    if [ -f "$PROJECT_ROOT/.env" ]; then
        log_message "INFO" "Sourcing environment variables from $PROJECT_ROOT/.env"
        source "$PROJECT_ROOT/.env"
    else
        log_message "WARNING" "No .env file found. Using default values."
    fi
    
    # Default values
    DB_USER=${DB_USER:-dashboard_user}
    DB_PASS=${DB_PASS:-$(openssl rand -hex 16)}
    DB_NAME=${DB_NAME:-dashboard_metrics}
    DB_HOST=${DB_HOST:-localhost}
    DB_PORT=${DB_PORT:-5432}
    
    # Export for subshells
    export PGPASSWORD=${POSTGRES_PASSWORD:-postgres}
    
    log_message "INFO" "Database Configuration:"
    log_message "INFO" "  Host: $DB_HOST"
    log_message "INFO" "  Port: $DB_PORT"
    log_message "INFO" "  User: $DB_USER"
    log_message "INFO" "  Database: $DB_NAME"
    
    # Check if PostgreSQL is running
    if ! pg_is_running "$DB_HOST" "$DB_PORT"; then
        log_message "ERROR" "PostgreSQL is not running on $DB_HOST:$DB_PORT"
        exit 1
    fi
    
    # Create database user if it doesn't exist
    if ! user_exists "$DB_USER"; then
        log_message "INFO" "Creating database user '$DB_USER'..."
        execute_sql "CREATE USER $DB_USER WITH PASSWORD '$DB_PASS';"
    fi
    
    # Create database if it doesn't exist
    if ! database_exists "$DB_NAME"; then
        log_message "INFO" "Creating database '$DB_NAME'..."
        execute_sql "CREATE DATABASE $DB_NAME WITH OWNER $DB_USER ENCODING 'UTF8' LC_COLLATE='en_US.UTF-8' LC_CTYPE='en_US.UTF-8' TEMPLATE=template0;"
    fi
    
    # Grant privileges
    log_message "INFO" "Granting privileges on database '$DB_NAME' to user '$DB_USER'..."
    execute_sql "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;"

    # Create or update .env file with database credentials
    log_message "INFO" "Updating .env file with database credentials..."
    
    # Create backup of existing .env file if it exists
    if [ -f "$PROJECT_ROOT/.env" ]; then
        cp "$PROJECT_ROOT/.env" "$PROJECT_ROOT/.env.bak.$(date +%Y%m%d%H%M%S)" 2>/dev/null || true
    fi
    
    # Function to set or update a variable in .env file
    set_env_var() {
        local var_name=$1
        local var_value=$2
        local env_file="$PROJECT_ROOT/.env"
        
        # Escape special characters in the value
        local escaped_value=$(printf '%s\n' "$var_value" | sed 's/[&/\]/\\&/g')
        
        if grep -q "^$var_name=" "$env_file" 2>/dev/null; then
            # Variable exists, update it
            sed -i "s|^$var_name=.*|$var_name='$escaped_value'|" "$env_file"
        else
            # Variable doesn't exist, add it
            echo "$var_name='$escaped_value'" >> "$env_file"
        fi
    }
    
    # Ensure .env file exists
    touch "$PROJECT_ROOT/.env"
    
    # Set database variables
    set_env_var "DB_HOST" "postgres"
    set_env_var "DB_PORT" "5432"
    set_env_var "DB_USER" "$DB_USER"
    set_env_var "DB_PASS" "$DB_PASS"
    set_env_var "DB_NAME" "$DB_NAME"
    
    # Set other required variables if they don't exist
    if ! grep -q '^SECRET_KEY=' "$PROJECT_ROOT/.env" 2>/dev/null; then
        set_env_var "SECRET_KEY" "$(openssl rand -hex 32)"
    fi
    
    if ! grep -q '^DEBUG=' "$PROJECT_ROOT/.env" 2>/dev/null; then
        set_env_var "DEBUG" "False"
    fi
    
    if ! grep -q '^VITE_API_URL=' "$PROJECT_ROOT/.env" 2>/dev/null; then
        set_env_var "VITE_API_URL" "http://localhost:8000"
    fi
    
    # Set secure production settings if not set
    if ! grep -q '^PRODUCTION=' "$PROJECT_ROOT/.env" 2>/dev/null; then
        set_env_var "PRODUCTION" "False"
    fi
    
    if ! grep -q '^SECURE_SSL_REDIRECT=' "$PROJECT_ROOT/.env" 2>/dev/null; then
        set_env_var "SECURE_SSL_REDIRECT" "False"
    fi
    
    if ! grep -q '^SESSION_COOKIE_SECURE=' "$PROJECT_ROOT/.env" 2>/dev/null; then
        set_env_var "SESSION_COOKIE_SECURE" "False"
    fi
    
    if ! grep -q '^CSRF_COOKIE_SECURE=' "$PROJECT_ROOT/.env" 2>/dev/null; then
        set_env_var "CSRF_COOKIE_SECURE" "False"
    fi
    
    # Set default timezone if not set
    if ! grep -q '^TIME_ZONE=' "$PROJECT_ROOT/.env" 2>/dev/null; then
        set_env_var "TIME_ZONE" "UTC"
    fi
    
    # Set default language if not set
    if ! grep -q '^LANGUAGE_CODE=' "$PROJECT_ROOT/.env" 2>/dev/null; then
        set_env_var "LANGUAGE_CODE" "en-us"
    fi
    
    # Set default allowed hosts if not set
    if ! grep -q '^ALLOWED_HOSTS=' "$PROJECT_ROOT/.env" 2>/dev/null; then
        set_env_var "ALLOWED_HOSTS" "localhost,127.0.0.1"
    fi
    
    # Set default CORS allowed origins if not set
    if ! grep -q '^CORS_ALLOWED_ORIGINS=' "$PROJECT_ROOT/.env" 2>/dev/null; then
        set_env_var "CORS_ALLOWED_ORIGINS" "http://localhost:3000,http://localhost:8000"
    fi
    
    # Set default email settings if not set
    if ! grep -q '^EMAIL_BACKEND=' "$PROJECT_ROOT/.env" 2>/dev/null; then
        set_env_var "EMAIL_BACKEND" "django.core.mail.backends.console.EmailBackend"
        set_env_var "DEFAULT_FROM_EMAIL" "noreply@example.com"
        set_env_var "SERVER_EMAIL" "root@localhost"
    fi
    
    # Set default cache settings if not set
    if ! grep -q '^CACHE_BACKEND=' "$PROJECT_ROOT/.env" 2>/dev/null; then
        set_env_var "CACHE_BACKEND" "django.core.cache.backends.locmem.LocMemCache"
    fi
    
    # Set default logging level if not set
    if ! grep -q '^LOG_LEVEL=' "$PROJECT_ROOT/.env" 2>/dev/null; then
        set_env_var "LOG_LEVEL" "INFO"
    fi
    
    # Set default static and media roots if not set
    if ! grep -q '^STATIC_ROOT=' "$PROJECT_ROOT/.env" 2>/dev/null; then
        set_env_var "STATIC_ROOT" "/var/www/static"
    fi
    
    if ! grep -q '^MEDIA_ROOT=' "$PROJECT_ROOT/.env" 2>/dev/null; then
        set_env_var "MEDIA_ROOT" "/var/www/media"
    fi
    
    # Set default admin credentials if not set
    if ! grep -q '^DJANGO_SUPERUSER_USERNAME=' "$PROJECT_ROOT/.env" 2>/dev/null; then
        set_env_var "DJANGO_SUPERUSER_USERNAME" "admin"
        set_env_var "DJANGO_SUPERUSER_EMAIL" "admin@example.com"
        set_env_var "DJANGO_SUPERUSER_PASSWORD" "$(openssl rand -base64 16)"
    fi
    
    # Set default database URL if not set
    if ! grep -q '^DATABASE_URL=' "$PROJECT_ROOT/.env" 2>/dev/null; then
        set_env_var "DATABASE_URL" "postgresql://$DB_USER:$DB_PASS@postgres:5432/$DB_NAME"
    fi
    
    # Set default cache URL if not set
    if ! grep -q '^CACHE_URL=' "$PROJECT_ROOT/.env" 2>/dev/null; then
        set_env_var "CACHE_URL" "locmemcache://"
    fi
    
    # Set default Celery settings if not set
    if ! grep -q '^CELERY_BROKER_URL=' "$PROJECT_ROOT/.env" 2>/dev/null; then
        set_env_var "CELERY_BROKER_URL" "redis://redis:6379/0"
        set_env_var "CELERY_RESULT_BACKEND" "redis://redis:6379/1"
        set_env_var "CELERY_ACCEPT_CONTENT" "application/json"
        set_env_var "CELERY_TASK_SERIALIZER" "json"
        set_env_var "CELERY_RESULT_SERIALIZER" "json"
        set_env_var "CELERY_TIMEZONE" "UTC"
    fi
    
    # Set default Redis settings if not set
    if ! grep -q '^REDIS_URL=' "$PROJECT_ROOT/.env" 2>/dev/null; then
        set_env_var "REDIS_URL" "redis://redis:6379/0"
    fi
    
    # Set default Sentry DSN if not set
    if ! grep -q '^SENTRY_DSN=' "$PROJECT_ROOT/.env" 2>/dev/null; then
        set_env_var "SENTRY_DSN" ""
    fi
    
    # Set default Google Analytics if not set
    if ! grep -q '^GOOGLE_ANALYTICS_ID=' "$PROJECT_ROOT/.env" 2>/dev/null; then
        set_env_var "GOOGLE_ANALYTICS_ID" ""
    fi
    
    # Set default reCAPTCHA settings if not set
    if ! grep -q '^RECAPTCHA_PUBLIC_KEY=' "$PROJECT_ROOT/.env" 2>/dev/null; then
        set_env_var "RECAPTCHA_PUBLIC_KEY" ""
        set_env_var "RECAPTCHA_PRIVATE_KEY" ""
    fi
    
    # Set default AWS settings if not set
    if ! grep -q '^AWS_ACCESS_KEY_ID=' "$PROJECT_ROOT/.env" 2>/dev/null; then
        set_env_var "AWS_ACCESS_KEY_ID" ""
        set_env_var "AWS_SECRET_ACCESS_KEY" ""
        set_env_var "AWS_STORAGE_BUCKET_NAME" ""
        set_env_var "AWS_S3_REGION_NAME" "us-east-1"
        set_env_var "AWS_S3_CUSTOM_DOMAIN" ""
        set_env_var "AWS_DEFAULT_ACL" "public-read"
        set_env_var "AWS_QUERYSTRING_AUTH" "False"
    fi
    
    # Set default email settings if not set
    if ! grep -q '^EMAIL_HOST=' "$PROJECT_ROOT/.env" 2>/dev/null; then
        set_env_var "EMAIL_HOST" ""
        set_env_var "EMAIL_PORT" "587"
        set_env_var "EMAIL_USE_TLS" "True"
        set_env_var "EMAIL_HOST_USER" ""
        set_env_var "EMAIL_HOST_PASSWORD" ""
    fi
    
    # Set default social auth settings if not set
    if ! grep -q '^SOCIAL_AUTH_GOOGLE_OAUTH2_KEY=' "$PROJECT_ROOT/.env" 2>/dev/null; then
        set_env_var "SOCIAL_AUTH_GOOGLE_OAUTH2_KEY" ""
        set_env_var "SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET" ""
    fi
    
    if ! grep -q '^SOCIAL_AUTH_FACEBOOK_KEY=' "$PROJECT_ROOT/.env" 2>/dev/null; then
        set_env_var "SOCIAL_AUTH_FACEBOOK_KEY" ""
        set_env_var "SOCIAL_AUTH_FACEBOOK_SECRET" ""
    fi
    
    if ! grep -q '^SOCIAL_AUTH_GITHUB_KEY=' "$PROJECT_ROOT/.env" 2>/dev/null; then
        set_env_var "SOCIAL_AUTH_GITHUB_KEY" ""
        set_env_var "SOCIAL_AUTH_GITHUB_SECRET" ""
    fi
    
    # Set default JWT settings if not set
    if ! grep -q '^JWT_SECRET_KEY=' "$PROJECT_ROOT/.env" 2>/dev/null; then
        set_env_var "JWT_SECRET_KEY" "$(openssl rand -hex 32)"
        set_env_var "JWT_ALGORITHM" "HS256"
        set_env_var "JWT_EXPIRATION_DELTA_DAYS" "7"
    fi
    
    # Set default API settings if not set
    if ! grep -q '^API_PAGE_SIZE=' "$PROJECT_ROOT/.env" 2>/dev/null; then
        set_env_var "API_PAGE_SIZE" "20"
        set_env_var "API_MAX_PAGE_SIZE" "100"
    fi
    
    # Set default CORS settings if not set
    if ! grep -q '^CORS_ORIGIN_WHITELIST=' "$PROJECT_ROOT/.env" 2>/dev/null; then
        set_env_var "CORS_ORIGIN_WHITELIST" "http://localhost:3000,http://localhost:8000"
    fi
    
    # Set default security settings
    if ! grep -q '^SECURE_HSTS_SECONDS=' "$PROJECT_ROOT/.env" 2>/dev/null; then
        set_env_var "SECURE_HSTS_SECONDS" "31536000"  # 1 year
        set_env_var "SECURE_HSTS_INCLUDE_SUBDOMAINS" "True"
        set_env_var "SECURE_CONTENT_TYPE_NOSNIFF" "True"
        set_env_var "X_FRAME_OPTIONS" "DENY"
        set_env_var "SECURE_BROWSER_XSS_FILTER" "True"
        set_env_var "SECURE_SSL_REDIRECT" "False"
        set_env_var "SESSION_COOKIE_SECURE" "False"
        set_env_var "CSRF_COOKIE_SECURE" "False"
        set_env_var "SECURE_REFERRER_POLICY" "same-origin"
    fi
    
    # Set default logging settings if not set
    if ! grep -q '^LOGGING_LEVEL=' "$PROJECT_ROOT/.env" 2>/dev/null; then
        set_env_var "LOGGING_LEVEL" "INFO"
        set_env_var "LOG_FORMAT" "json"
    fi
    
    # Set default cache settings if not set
    if ! grep -q '^CACHE_TTL=' "$PROJECT_ROOT/.env" 2>/dev/null; then
        set_env_var "CACHE_TTL" "300"  # 5 minutes
    fi
    
    # Set default rate limiting if not set
    if ! grep -q '^RATE_LIMIT=' "$PROJECT_ROOT/.env" 2>/dev/null; then
        set_env_var "RATE_LIMIT" "1000/1hour"
    fi
    
    # Set default file storage settings if not set
    if ! grep -q '^DEFAULT_FILE_STORAGE=' "$PROJECT_ROOT/.env" 2>/dev/null; then
        set_env_var "DEFAULT_FILE_STORAGE" "django.core.files.storage.FileSystemStorage"
    fi
    
    log_message "SUCCESS" "Updated .env file with all required settings"
    
    # Set proper permissions on .env file
    chmod 600 "$PROJECT_ROOT/.env"
    
    log_message "SUCCESS" "=== Database setup completed successfully ==="
    log_message "INFO" "Database connection string: postgresql://$DB_USER:****@$DB_HOST:$DB_PORT/$DB_NAME"
    log_message "INFO" "Log file: $LOG_FILE"
    
    # Display important information
    echo -e "\n${GREEN}=== Database Setup Summary ===${NC}"
    echo -e "${YELLOW}Database:${NC} $DB_NAME"
    echo -e "${YELLOW}User:${NC} $DB_USER"
    echo -e "${YELLOW}Host:${NC} $DB_HOST"
    echo -e "${YELLOW}Port:${NC} $DB_PORT"
    echo -e "${YELLOW}Password:${NC} ********"
    echo -e "\n${YELLOW}Important:${NC} Database credentials have been saved to $PROJECT_ROOT/.env"
    echo -e "${YELLOW}Note:${NC} Make sure to secure your .env file and never commit it to version control."
    
    # Check if running in Docker
    if [ -f "/.dockerenv" ]; then
        echo -e "\n${YELLOW}Running inside Docker container.${NC}"
    else
        # Check if Docker is running
        if command -v docker >/dev/null 2>&1 && docker info >/dev/null 2>&1; then
            echo -e "\n${YELLOW}Docker is running. You can start the application with:${NC}"
            echo "docker-compose up -d"
        else
            echo -e "\n${YELLOW}Docker is not running. Please start Docker and run:${NC}"
            echo "docker-compose up -d"
        fi
    fi
    
    echo -e "\n${GREEN}=== Setup completed successfully ===${NC}\n"
}

# Execute main function
main "$@"
