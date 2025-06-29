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

echo -e "${GREEN}=== Docker Container Test ===${NC}"

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if running as root
if [ "$EUID" -eq 0 ]; then 
    echo -e "${YELLOW}⚠ Running as root. Some container checks might not work correctly.${NC}"
fi

# Test 1: Check Docker
if ! command_exists docker; then
    echo -e "${RED}✗ Docker is not installed${NC}"
    echo -e "${YELLOW}Please install Docker first: https://docs.docker.com/engine/install/${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker is installed${NC}"
docker --version

# Test 2: Check Docker Compose
if ! command_exists docker-compose && ! command_exists docker compose; then
    echo -e "${RED}✗ Docker Compose is not installed${NC}"
    echo -e "${YELLOW}Please install Docker Compose: https://docs.docker.com/compose/install/${NC}"
    exit 1
fi

# Check for docker-compose v1 or v2
if command_exists docker-compose; then
    COMPOSE_CMD="docker-compose"
    echo -e "${GREEN}✓ Docker Compose v1 is installed${NC}"
    docker-compose --version
else
    COMPOSE_CMD="docker compose"
    echo -e "${GREEN}✓ Docker Compose v2 is installed${NC}"
    docker compose version
fi

# Test 3: Check if containers are running
echo -e "\n${GREEN}=== Checking Docker Containers ===${NC}"

# Check if any dashboard containers are running
DASHBOARD_CONTAINERS=$(${COMPOSE_CMD} ps --services 2>/dev/null || true)

if [ -z "$DASHBOARD_CONTAINERS" ]; then
    echo -e "${YELLOW}No dashboard containers found. Make sure to run '${COMPOSE_CMD} up -d' first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Found running containers:${NC}"
echo "$DASHBOARD_CONTAINERS"

# Test 4: Check container status
check_container() {
    local container=$1
    local status=$(${COMPOSE_CMD} ps $container 2>/dev/null | grep -o "Up" || true)
    
    if [ "$status" = "Up" ]; then
        echo -e "${GREEN}✓ Container $container is running${NC}"
        return 0
    else
        echo -e "${RED}✗ Container $container is not running${NC}"
        return 1
    fi
}

# Check essential containers
ESSENTIAL_CONTAINERS=("postgres" "backend" "frontend")
ALL_RUNNING=true

for container in "${ESSENTIAL_CONTAINERS[@]}"; do
    if ! check_container $container; then
        ALL_RUNNING=false
    fi
done

# Test 5: Check application health
if $ALL_RUNNING; then
    echo -e "\n${GREEN}=== Testing Application Health ===${NC}"
    
    # Check backend health
    if [ "$(${COMPOSE_CMD} ps backend --status running 2>/dev/null | wc -l)" -gt 1 ]; then
        echo -e "${YELLOW}Testing backend health...${NC}"
        if ${COMPOSE_CMD} exec -T backend curl -s http://localhost:8000/api/health | grep -q '"status":"ok"'; then
            echo -e "${GREEN}✓ Backend is healthy${NC}"
        else
            echo -e "${YELLOW}⚠ Backend health check failed${NC}"
        fi
    fi
    
    # Check frontend (if exposed)
    if [ "$(${COMPOSE_CMD} ps frontend --status running 2>/dev/null | wc -l)" -gt 1 ]; then
        echo -e "${YELLOW}Testing frontend...${NC}"
        if ${COMPOSE_CMD} exec -T frontend curl -s http://localhost:3000 | grep -q '<div id="root">'; then
            echo -e "${GREEN}✓ Frontend is serving content${NC}"
        else
            echo -e "${YELLOW}⚠ Could not verify frontend content${NC}"
        fi
    fi
    
    # Check database connection
    if [ "$(${COMPOSE_CMD} ps postgres --status running 2>/dev/null | wc -l)" -gt 1 ]; then
        echo -e "${YELLOW}Testing database connection...${NC}"
        if ${COMPOSE_CMD} exec -T postgres psql -U $DB_USER -d $DB_NAME -c "SELECT 1" &>/dev/null; then
            echo -e "${GREEN}✓ Successfully connected to the database${NC}"
        else
            echo -e "${YELLOW}⚠ Could not connect to the database${NC}"
        fi
    fi
fi

# Test 6: Check exposed ports (if any)
echo -e "\n${GREEN}=== Checking Exposed Ports ===${NC}"
${COMPOSE_CMD} ps --services | while read service; do
    ports=$(${COMPOSE_CMD} port $service 2>/dev/null || true)
    if [ -n "$ports" ]; then
        echo -e "${GREEN}✓ $service exposes:${NC}"
        echo "$ports" | sed 's/^/  /'
    fi
done

# Test 7: Check container logs for errors
echo -e "\n${GREEN}=== Checking for Container Errors ===${NC}"
${COMPOSE_CMD} ps --services | while read service; do
    log_errors=$(${COMPOSE_CMD} logs --tail=20 $service 2>&1 | grep -i 'error\|exception\|fail' || true)
    if [ -n "$log_errors" ]; then
        echo -e "${YELLOW}⚠ Found potential issues in $service logs:${NC}"
        echo "$log_errors" | sed 's/^/  /'
    else
        echo -e "${GREEN}✓ No errors found in $service logs${NC}"
    fi
done

echo -e "\n${GREEN}=== Test Completed ===${NC}"
if $ALL_RUNNING; then
    echo -e "${GREEN}✓ All essential containers are running!${NC}"
else
    echo -e "${YELLOW}⚠ Some containers are not running. Check above for details.${NC}"
    echo -e "${YELLOW}Try running '${COMPOSE_CMD} up -d' to start all services.${NC}"
fi
