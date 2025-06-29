#!/bin/bash

# Exit on error
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Default values
BACKUP_DIR="/var/backups/dashboard"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/dashboard_db_${TIMESTAMP}.sql"
KEEP_DAYS=30

# Source environment variables
if [ -f ../../.env ]; then
    export $(grep -v '^#' ../../.env | xargs)
fi

# Ensure backup directory exists
mkdir -p "$BACKUP_DIR"

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${YELLOW}Running as non-root user, some operations might require sudo.${NC}"
fi

echo -e "${GREEN}=== Starting Database Backup ===${NC}"

# Check if required commands are available
for cmd in docker pg_dump; do
    if ! command -v $cmd &> /dev/null; then
        echo -e "${RED}Error: $cmd is required but not installed.${NC}" >&2
        exit 1
    fi
done

# Get PostgreSQL container ID
PG_CONTAINER=$(docker ps -q -f name=dashboard_postgres)
if [ -z "$PG_CONTAINER" ]; then
    echo -e "${RED}Error: PostgreSQL container not found. Is it running?${NC}" >&2
    exit 1
fi

# Set default DB values if not provided
DB_USER=${DB_USER:-dashboard_user}
DB_NAME=${DB_NAME:-dashboard_metrics}

# Create backup
echo -e "${YELLOW}Creating database backup to ${BACKUP_FILE}...${NC}"

# Use docker exec to run pg_dump inside the container
docker exec -e PGPASSWORD="$DB_PASS" "$PG_CONTAINER" \
    pg_dump -U "$DB_USER" -d "$DB_NAME" -F c -f "/tmp/backup_${TIMESTAMP}.dump"

# Copy the backup file from the container to the host
docker cp "${PG_CONTAINER}:/tmp/backup_${TIMESTAMP}.dump" "${BACKUP_FILE}.dump"

# Clean up the temporary file in the container
docker exec "$PG_CONTAINER" rm -f "/tmp/backup_${TIMESTAMP}.dump"

# Compress the backup
if command -v gzip &> /dev/null; then
    echo -e "${YELLOW}Compressing backup file...${NC}"
    gzip -f "${BACKUP_FILE}.dump"
    BACKUP_FILE="${BACKUP_FILE}.dump.gz"
else
    BACKUP_FILE="${BACKUP_FILE}.dump"
fi

# Set proper permissions
chmod 600 "$BACKUP_FILE"

# Clean up old backups
if [ "$KEEP_DAYS" -gt 0 ]; then
    echo -e "${YELLOW}Cleaning up backups older than $KEEP_DAYS days...${NC}"
    find "$BACKUP_DIR" -name "dashboard_db_*" -type f -mtime +$KEEP_DAYS -delete
fi

# Show backup information
BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
echo -e "${GREEN}✓ Backup completed successfully!${NC}"
echo -e "  File: ${BACKUP_FILE}"
echo -e "  Size: ${BACKUP_SIZE}"

# Create a checksum file
if command -v sha256sum &> /dev/null; then
    sha256sum "$BACKUP_FILE" > "${BACKUP_FILE}.sha256"
    echo -e "  SHA256: $(cat "${BACKUP_FILE}.sha256" | cut -d' ' -f1)"
fi

exit 0
