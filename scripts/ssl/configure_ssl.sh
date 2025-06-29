#!/bin/bash

# Exit on error
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Source environment variables
if [ -z "$DOMAIN" ]; then
    echo -e "${YELLOW}DOMAIN environment variable not set. Using localhost (not suitable for production).${NC}"
    DOMAIN=localhost
fi

echo -e "${GREEN}=== Configuring SSL for $DOMAIN (Docker) ===${NC}"

# Get the project root directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$(dirname "$SCRIPT_DIR")")"

# Create nginx and ssl directories if they don't exist
NGINX_DIR="$PROJECT_ROOT/nginx"
SSL_DIR="$PROJECT_ROOT/ssl"
mkdir -p "$NGINX_DIR"
mkdir -p "$SSL_DIR"

# Create SSL configuration for Docker
echo -e "${YELLOW}Creating SSL configuration for Docker container...${NC}"

# Create SSL-enabled server configuration
cat > "$NGINX_DIR/ssl.conf" <<EOL
# HTTP to HTTPS redirect
server {
    listen 80;
    server_name $DOMAIN;
    return 301 https://\$host\$request_uri;
}

# HTTPS server
server {
    listen 443 ssl http2;
    server_name $DOMAIN;

    # SSL configuration
    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_session_tickets off;

    # Modern configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # HSTS (ngx_http_headers_module is required) (63072000 seconds = 2 years)
    add_header Strict-Transport-Security "max-age=63072000" always;

    # OCSP stapling
    ssl_stapling on;
    ssl_stapling_verify on;

    # Verify chain of trust of OCSP response using Root CA and Intermediate certs
    ssl_trusted_certificate /etc/nginx/ssl/chain.pem;

    # Replace with the IP of your resolver
    resolver 8.8.8.8 8.8.4.4 valid=300s;
    resolver_timeout 5s;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "strict-origin-when-cross-origin";

    # Frontend
    location / {
        proxy_pass http://frontend:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # Backend API
    location /api {
        proxy_pass http://backend:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # Health check
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
EOL

# Generate self-signed certificate for localhost or copy existing certificates
if [ "$DOMAIN" = "localhost" ]; then
    echo -e "${YELLOW}Generating self-signed certificate for localhost...${NC}"
    
    # Generate private key
    openssl genrsa -out "$SSL_DIR/privkey.pem" 2048
    
    # Generate certificate
    openssl req -new -x509 -key "$SSL_DIR/privkey.pem" -out "$SSL_DIR/fullchain.pem" -days 365 \
        -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"
    
    # Copy fullchain as chain for self-signed cert
    cp "$SSL_DIR/fullchain.pem" "$SSL_DIR/chain.pem"
    
    echo -e "${GREEN}Self-signed certificate generated successfully${NC}"
else
    echo -e "${YELLOW}For production domain $DOMAIN, you need to:${NC}"
    echo -e "${YELLOW}1. Place your SSL certificates in: $SSL_DIR/${NC}"
    echo -e "${YELLOW}   - privkey.pem (private key)${NC}"
    echo -e "${YELLOW}   - fullchain.pem (certificate chain)${NC}"
    echo -e "${YELLOW}   - chain.pem (intermediate certificate)${NC}"
    echo -e "${YELLOW}2. Update your Docker Compose to mount the SSL directory${NC}"
    echo -e "${YELLOW}3. Use the ssl.conf configuration instead of default.conf${NC}"
fi

# Set proper permissions
chmod 644 "$NGINX_DIR/ssl.conf"
chmod 600 "$SSL_DIR"/*.pem 2>/dev/null || true

echo -e "${GREEN}=== SSL configuration for Docker completed successfully ===${NC}"
echo -e "${YELLOW}SSL configuration created in: $NGINX_DIR/ssl.conf${NC}"
echo -e "${YELLOW}SSL certificates directory: $SSL_DIR${NC}"
echo -e "${YELLOW}These files will be mounted into the Nginx Docker container${NC}"
