#!/bin/bash

# Exit on error
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}Please run as root (use sudo)${NC}"
    exit 1
fi

echo -e "${GREEN}=== Configuring Firewall ===${NC}"

# Enable UFW if not already enabled
if ! ufw status | grep -q "Status: active"; then
    echo -e "${YELLOW}Enabling UFW firewall...${NC}"
    ufw --force enable
else
    echo -e "${YELLOW}UFW firewall is already enabled.${NC}"
fi

# Set default policies
echo -e "${YELLOW}Setting default firewall policies...${NC}"
ufw default deny incoming
ufw default allow outgoing

# Allow SSH (rate limited)
ufw limit 22/tcp comment 'Rate-limited SSH'

# Allow HTTP/HTTPS
ufw allow 80/tcp comment 'HTTP'
ufw allow 443/tcp comment 'HTTPS'

# Allow Docker Swarm ports if needed
# ufw allow 2377/tcp comment 'Docker Swarm'
# ufw allow 7946/tcp comment 'Docker Swarm'
# ufw allow 7946/udp comment 'Docker Swarm'
# ufw allow 4789/udp comment 'Docker Swarm'

# Allow specific Docker container ports
ufw allow 3000/tcp comment 'Frontend'
ufw allow 8000/tcp comment 'Backend API'
ufw allow 5432/tcp comment 'PostgreSQL'

# Apply the rules
ufw --force reload

# Show the configured rules
echo -e "${YELLOW}Current firewall rules:${NC}"
ufw status verbose

echo -e "${GREEN}=== Firewall configuration completed successfully ===${NC}"
