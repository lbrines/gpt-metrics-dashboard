#!/bin/bash

# Exit on error
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Source environment variables
if [ -f ../../.env ]; then
    export $(grep -v '^#' ../../.env | xargs)
fi

# Default values
DOMAIN=${DOMAIN:-localhost}
DB_USER=${DB_USER:-dashboard_user}
DB_NAME=${DB_NAME:-dashboard_metrics}

echo -e "${GREEN}=== Testing Installation ===${NC}"

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${YELLOW}Running as non-root user, some checks might be skipped.${NC}"
fi

# Test 1: Check Docker
if command_exists docker; then
    echo -e "${GREEN}✓ Docker is installed${NC}"
    docker --version
else
    echo -e "${RED}✗ Docker is not installed${NC}"
fi

# Test 2: Check Docker Compose
if command_exists docker-compose; then
    echo -e "${GREEN}✓ Docker Compose is installed${NC}"
    docker-compose --version
else
    echo -e "${RED}✗ Docker Compose is not installed${NC}"
fi

# Test 3: Check Node.js
if command_exists node; then
    echo -e "${GREEN}✓ Node.js is installed${NC}"
    node --version
    npm --version
else
    echo -e "${RED}✗ Node.js is not installed${NC}"
fi

# Test 4: Check Python
if command_exists python3; then
    echo -e "${GREEN}✓ Python is installed${NC}"
    python3 --version
    pip3 --version
else
    echo -e "${RED}✗ Python is not installed${NC}"
fi

# Test 5: Check PostgreSQL
if command_exists psql; then
    echo -e "${GREEN}✓ PostgreSQL is installed${NC}"
    psql --version
    
    # Test database connection
    if [ -n "$DB_USER" ] && [ -n "$DB_NAME" ]; then
        if PGPASSWORD=$DB_PASS psql -U "$DB_USER" -d "$DB_NAME" -c "SELECT 1" &> /dev/null; then
            echo -e "${GREEN}✓ Successfully connected to the database${NC}"
        else
            echo -e "${YELLOW}⚠ Could not connect to the database${NC}"
        fi
    fi
else
    echo -e "${RED}✗ PostgreSQL is not installed${NC}"
fi

# Test 6: Check Nginx
if systemctl is-active --quiet nginx; then
    echo -e "${GREEN}✓ Nginx is running${NC}"
    nginx -v
    
    # Test HTTP status
    if command_exists curl; then
        echo -e "${YELLOW}Testing HTTP status...${NC}"
        HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://$DOMAIN" || true)
        if [ "$HTTP_STATUS" = "200" ] || [ "$HTTP_STATUS" = "301" ] || [ "$HTTP_STATUS" = "302" ]; then
            echo -e "${GREEN}✓ Nginx is serving content (HTTP $HTTP_STATUS)${NC}"
        else
            echo -e "${YELLOW}⚠ Nginx returned HTTP $HTTP_STATUS${NC}"
        fi
    fi
else
    echo -e "${RED}✗ Nginx is not running${NC}"
fi

# Test 7: Check SSL certificate
if [ "$DOMAIN" != "localhost" ]; then
    if [ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
        echo -e "${GREEN}✓ SSL certificate found for $DOMAIN${NC}"
        
        if command_exists openssl; then
            CERT_EXPIRY=$(openssl x509 -enddate -noout -in "/etc/letsencrypt/live/$DOMAIN/cert.pem" | cut -d= -f2)
            echo -e "  Certificate valid until: $CERT_EXPIRY"
        fi
        
        # Test HTTPS
        if command_exists curl; then
            echo -e "${YELLOW}Testing HTTPS...${NC}"
            if curl -s -o /dev/null --fail --insecure "https://$DOMAIN"; then
                echo -e "${GREEN}✓ HTTPS is working${NC}"
            else
                echo -e "${YELLOW}⚠ Could not establish HTTPS connection${NC}"
            fi
        fi
    else
        echo -e "${YELLOW}⚠ No SSL certificate found for $DOMAIN${NC}"
    fi
else
    echo -e "${YELLOW}ℹ Localhost detected, skipping SSL tests${NC}"
fi

echo -e "${GREEN}=== Installation test completed ===${NC}"
echo -e "${YELLOW}Please review any warnings or errors above.${NC}"
