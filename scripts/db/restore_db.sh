#!/bin/bash

# Exit on error
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if backup file is provided
if [ $# -eq 0 ]; then
    echo -e "${RED}Error: No backup file specified.${NC}" >&2
    echo -e "Usage: $0 /path/to/backup_file.dump[.gz]" >&2
    exit 1
fi

BACKUP_FILE="$1"

# Source environment variables
if [ -f ../../.env ]; then
    export $(grep -v '^#' ../../.env | xargs)
fi

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${YELLOW}Running as non-root user, some operations might require sudo.${NC}"
fi

# Check if backup file exists
if [ ! -f "$BACKUP_FILE" ]; then
    echo -e "${RED}Error: Backup file '$BACKUP_FILE' not found.${NC}" >&2
    exit 1
fi

# Check if compressed
TEMP_FILE=""
if [[ "$BACKUP_FILE" == *.gz ]]; then
    echo -e "${YELLOW}Decompressing backup file...${NC}"
    TEMP_FILE="$(mktemp)"
    gunzip -c "$BACKUP_FILE" > "$TEMP_FILE"
    BACKUP_FILE="$TEMP_FILE"
fi

echo -e "${GREEN}=== Starting Database Restore ===${NC}"

# Check if required commands are available
for cmd in docker pg_restore; do
    if ! command -v $cmd &> /dev/null; then
        echo -e "${RED}Error: $cmd is required but not installed.${NC}" >&2
        [ -n "$TEMP_FILE" ] && rm -f "$TEMP_FILE"
        exit 1
    fi
done

# Get PostgreSQL container ID
PG_CONTAINER=$(docker ps -q -f name=dashboard_postgres)
if [ -z "$PG_CONTAINER" ]; then
    echo -e "${RED}Error: PostgreSQL container not found. Is it running?${NC}" >&2
    [ -n "$TEMP_FILE" ] && rm -f "$TEMP_FILE"
    exit 1
fi

# Set default DB values if not provided
DB_USER=${DB_USER:-dashboard_user}
DB_NAME=${DB_NAME:-dashboard_metrics}

# Ask for confirmation
read -p "This will overwrite the database '$DB_NAME'. Are you sure? [y/N] " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Restore cancelled.${NC}"
    [ -n "$TEMP_FILE" ] && rm -f "$TEMP_FILE"
    exit 0
fi

# Stop the backend to prevent new connections
echo -e "${YELLOW}Stopping backend service...${NC}"
docker stop dashboard_backend 2>/dev/null || true

# Copy the backup file to the container
TEMP_CONTAINER_FILE="/tmp/restore_$(date +%s).dump"
docker cp "$BACKUP_FILE" "${PG_CONTAINER}:${TEMP_CONTAINER_FILE}"

# Restore the database
echo -e "${YELLOW}Restoring database from backup...${NC}"

docker exec -e PGPASSWORD="$DB_PASS" "$PG_CONTAINER" \
    pg_restore -U "$DB_USER" -d "$DB_NAME" -c "${TEMP_CONTAINER_FILE}" || {
    echo -e "${RED}Error: Failed to restore database.${NC}" >&2
    docker exec "$PG_CONTAINER" rm -f "$TEMP_CONTAINER_FILE"
    [ -n "$TEMP_FILE" ] && rm -f "$TEMP_FILE"
    exit 1
}

# Clean up
docker exec "$PG_CONTAINER" rm -f "$TEMP_CONTAINER_FILE"
[ -n "$TEMP_FILE" ] && rm -f "$TEMP_FILE"

# Restart the backend
echo -e "${YELLOW}Restarting backend service...${NC}"
docker start dashboard_backend 2>/dev/null || true

echo -e "${GREEN}✓ Database restore completed successfully!${NC}"
echo -e "  Database: ${DB_NAME}"
echo -e "  Restored from: $1"

exit 0
