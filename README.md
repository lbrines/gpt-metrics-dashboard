# GPTs Metrics Dashboard

## Description
Dashboard for visualizing implicit metrics from multiple custom GPTs. Built with FastAPI, PostgreSQL, React (Vite + Tailwind), and Docker Compose.

## Project Structure
```
gpt-metrics-dashboard/
├── docker-compose.yml       # Docker services configuration
├── docker-compose.prod.yml  # Production configuration
├── .env.example            # Example environment variables
├── .gitignore              # Git ignore rules
├── README.md               # This file
├── README.es.md            # Spanish version
├── test.sh                 # Script to verify system status
├── scripts/                # Automation scripts
│   ├── install.sh          # Main installation script
│   ├── setup/              # Setup scripts
│   │   ├── install_dependencies.sh
│   │   ├── configure_firewall.sh
│   │   └── configure_nginx.sh
│   ├── db/                 # Database scripts
│   │   └── setup_db.sh
│   ├── ssl/                # SSL configuration
│   │   └── configure_ssl.sh
│   └── test/               # Test scripts
│       └── test_installation.sh
├── data/                   # Persistent data
│   └── db/                 # PostgreSQL data
├── init-scripts/           # Database initialization
│   └── 01-init-extensions.sql
└── src/                    # Application source
    ├── backend/            # FastAPI backend
    │   ├── Dockerfile
    │   ├── requirements.txt
    │   └── app/...
    └── frontend/           # React + Vite + Tailwind
        ├── Dockerfile
        ├── index.html
        ├── package.json
        └── src/...
```

## Requirements
- Docker and Docker Compose
- Ubuntu 24.04 (host recommended)
- **Note:** Nginx runs as a Docker container, no system installation required

## Installation and Execution

### 1. Clone the repository
```bash
git clone git@github.com:lbrines/gpt-metrics-dashboard.git
cd gpt-metrics-dashboard
```

### 2. Automatic Installation (Recommended)

#### For Development:
```bash
# Make the installation script executable
chmod +x scripts/install.sh

# Run the installation with default settings
sudo ./scripts/install.sh
```

#### For Production:
```bash
# Set your domain (replace example.com with your domain)
export DOMAIN=example.com

# Set database credentials (or let the script generate them)
export DB_USER=dashboard_user
export DB_PASS=$(openssl rand -hex 16)
export DB_NAME=dashboard_metrics

# Run the installation
sudo ./scripts/install.sh
```

### 3. Manual Installation (Alternative)

#### 2.1 Install Dependencies
```bash
sudo ./scripts/setup/install_dependencies.sh
```

#### 2.2 Configure Database
```bash
# Set database credentials (or use defaults)
export DB_USER=dashboard_user
export DB_PASS=$(openssl rand -hex 16)
export DB_NAME=dashboard_metrics

# Run database setup
sudo ./scripts/db/setup_db.sh
```

#### 2.3 Configure Nginx and SSL (Docker-based)
```bash
# Configure Nginx for Docker container
./scripts/setup/configure_nginx.sh

# Configure SSL (for production domains)
export DOMAIN=example.com
./scripts/ssl/configure_ssl.sh
```

#### 2.4 Configure Firewall
```bash
sudo ./scripts/setup/configure_firewall.sh
```

#### 2.5 Start Services
```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### 4. Verify Installation
```bash
# Run comprehensive tests
./scripts/test/test_installation.sh

# Or use the simplified test
./test.sh
```

## Accessing the Application

### Development Environment
- **Dashboard (Frontend):** http://localhost:3000
- **API (Backend):** http://localhost:8000
- **API Documentation:** http://localhost:8000/docs

### Production Environment (if configured with a domain)
- **Dashboard (Frontend):** https://your-domain.com
- **API (Backend):** https://your-domain.com/api
- **API Documentation:** https://your-domain.com/api/docs

## Privacy Policy

Our Privacy Policy is available at:  
**https://koomtai.com/privacy**

### Endpoint

The privacy policy is served as a static HTML page through FastAPI:

```bash
curl -i https://koomtai.com/privacy
```

### Features
- **Direct access**: Available at `/privacy` route
- **Cache-optimized**: 1-hour browser cache for better performance
- **Security headers**: Includes `X-Content-Type-Options` and `X-Frame-Options`
- **GDPR/CCPA compliant**: Complete privacy policy following international standards

### File Structure
```
privacy/
├── privacy.html      # HTML privacy policy document
└── __init__.py       # Python package initialization
```

### Technical Implementation
- **Backend endpoint**: `/privacy` in FastAPI (main.py)
- **Nginx proxy**: Direct route configuration in `nginx/default.conf`
- **Response headers**: Optimized for security and caching
- **Error handling**: Comprehensive error logging and HTTP status codes

## Environment Variables

### Required for Production
- `DOMAIN`: Your domain name (e.g., example.com)
- `DB_USER`: Database username (default: dashboard_user)
- `DB_PASS`: Database password (auto-generated if not provided)
- `DB_NAME`: Database name (default: dashboard_metrics)
- `SECRET_KEY`: Secret key for the application (auto-generated if not provided)

### Optional
- `APP_ENV`: Application environment (development, production, test)
- `VITE_API_URL`: Frontend API URL (auto-configured based on domain)

## Nginx Configuration (Docker-based)

This project uses Nginx as a Docker container instead of a system installation. The configuration files are located in the `nginx/` directory:

### Configuration Files
- `nginx/nginx.conf`: Main Nginx configuration
- `nginx/default.conf`: HTTP server configuration (development)
- `nginx/ssl.conf`: HTTPS server configuration (production)

### SSL Certificates
SSL certificates are stored in the `ssl/` directory:
- `ssl/privkey.pem`: Private key
- `ssl/fullchain.pem`: Certificate chain
- `ssl/chain.pem`: Intermediate certificate

### Development vs Production
- **Development**: Uses `default.conf` with HTTP on port 80
- **Production**: Uses `ssl.conf` with HTTPS on port 443 and HTTP to HTTPS redirect

### Customizing Nginx Configuration
To modify the Nginx configuration:
1. Edit the files in the `nginx/` directory
2. Restart the Nginx container: `docker compose restart nginx`
3. The configuration is automatically mounted into the container

### SSL Certificate Management
For production domains:
1. Place your SSL certificates in the `ssl/` directory
2. Update your Docker Compose to mount the SSL directory
3. Use the `ssl.conf` configuration instead of `default.conf`

## Available Metrics
- **Messages per session**: Total "user_message" events ÷ Total sessions
- **Average response time**: Average latency_ms in "response" events
- **Session duration distribution**: Time range histogram
- **Daily session count**: Number of sessions grouped by date

## Development

### Hot-reload Development Mode
The current configuration includes bind mounts for hot-reload, so any changes to the backend or frontend source code will be automatically reflected.

### Database
- **Host**: localhost:5432
- **User**: admin
- **Password**: adminpassword
- **Database**: metricas_gpt

### Database Structure
- **gpts**: Basic information for each GPT
- **sessions**: User session records with GPTs
- **events**: Events during each session (messages, responses, etc.)

## Maintenance

### Backup Database
```bash
# Create a backup
./scripts/db/backup_db.sh

# Restore from backup
./scripts/db/restore_db.sh backup_file.sql
```

### Reset Data
```bash
# Stop and remove all containers
docker compose down

# Remove database volume (WARNING: This will delete all data)
sudo rm -rf ./data/db/*

# Start services again
docker compose up -d
```

### Logs
```bash
# View logs for all services
docker compose logs -f

# View logs for a specific service
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f postgres
docker compose logs -f nginx

# View Nginx logs (Docker container)
docker compose logs -f nginx
```

### System Maintenance
```bash
# Update all containers
docker compose pull
docker compose up -d --force-recreate

# Clean up unused resources
docker system prune -f
docker volume prune -f
```

## Security

### Firewall Rules
The installation script configures UFW with the following rules:
- Allow SSH (port 22, rate-limited)
- Allow HTTP (port 80)
- Allow HTTPS (port 443)
- Allow Docker Swarm ports (if needed)
- Allow application ports (3000, 8000, 5432)

### SSL Configuration
- Uses Let's Encrypt for SSL certificates in production
- Auto-renewal is set up via cron
- Strong SSL/TLS configuration with modern ciphers
- HTTP to HTTPS redirect
- HSTS enabled

### Database Security
- Randomly generated passwords if not provided
- Limited database user privileges
- Connections restricted to localhost/docker network
- Regular backups recommended

## Troubleshooting

### Common Issues

#### Port Conflicts
If you encounter port conflicts, check which service is using the port:
```bash
sudo lsof -i :<port>
sudo netstat -tulpn | grep <port>
```

#### Certificate Issues
For Let's Encrypt certificate issues:
```bash
# Check certificate status
sudo certbot certificates

# Renew certificates manually
sudo certbot renew --dry-run
```

#### Docker Issues
```bash
# Check container status
docker ps -a

# Check container logs
docker logs <container_id>

# Restart a container
docker restart <container_id>
```

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
Distributed under the MIT License. See `LICENSE` for more information.


## Tecnologías utilizadas
- **Backend**: FastAPI, SQLAlchemy, PostgreSQL
- **Frontend**: React, Vite, Tailwind CSS, Chart.js
- **Infraestructura**: Docker, Docker Compose
