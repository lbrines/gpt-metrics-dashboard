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

echo -e "${GREEN}=== Configuring Nginx ===${NC}"

# Create Nginx configuration
echo -e "${YELLOW}Creating Nginx configuration...${NC}"
cat > /etc/nginx/nginx.conf <<EOL
user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
    worker_connections 1024;
    multi_accept on;
    use epoll;
}

http {
    # Basic Settings
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    server_tokens off;
    client_max_body_size 100M;

    # MIME Types
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Logging Settings
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    # Gzip Settings
    gzip on;
    gzip_disable "msie6";
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_buffers 16 8k;
    gzip_http_version 1.1;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Virtual Host Configs
    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}
EOL

# Create a basic default page
echo -e "${YELLOW}Creating default page...${NC}"
mkdir -p /var/www/html
cat > /var/www/html/index.nginx-debian.html <<EOL
<!DOCTYPE html>
<html>
<head>
    <title>Welcome to Dashboard Metrics</title>
    <style>
        body {
            width: 35em;
            margin: 0 auto;
            font-family: Tahoma, Verdana, Arial, sans-serif;
            text-align: center;
            padding-top: 50px;
        }
        h1 {
            color: #2c3e50;
        }
        .status {
            color: #27ae60;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>Welcome to Dashboard Metrics</h1>
    <p>If you see this page, the Nginx web server is successfully installed and working.</p>
    <p>Further configuration is required to access the Dashboard Metrics application.</p>
    <p>Status: <span class="status">Nginx is running</span></p>
</body>
</html>
EOL

# Set proper permissions
chown -R www-data:www-data /var/www/html
chmod -R 755 /var/www

# Test Nginx configuration
echo -e "${YELLOW}Testing Nginx configuration...${NC}"
nginx -t

# Restart Nginx
echo -e "${YELLOW}Restarting Nginx...${NC}"
systemctl restart nginx
systemctl enable nginx

echo -e "${GREEN}=== Nginx configuration completed successfully ===${NC}"
