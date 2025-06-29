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
PROJECT_ROOT=$(dirname "$SCRIPT_DIR")
LOG_FILE="$PROJECT_ROOT/logs/dependencies_install.log"

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

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to install package
install_package() {
    local pkg=$1
    local pkg_name=${2:-$pkg}
    
    if ! dpkg -l | grep -q "^ii  $pkg "; then
        log_message "INFO" "Installing $pkg_name..."
        if ! DEBIAN_FRONTEND=noninteractive apt-get install -y $pkg >> "$LOG_FILE" 2>&1; then
            log_message "ERROR" "Failed to install $pkg_name"
            return 1
        fi
        log_message "SUCCESS" "Successfully installed $pkg_name"
    else
        log_message "INFO" "$pkg_name is already installed"
    fi
}

# Function to add repository if not already added
add_repository() {
    local repo=$1
    local key_url=$2
    
    if ! grep -q "^deb .*${repo}" /etc/apt/sources.list /etc/apt/sources.list.d/* 2>/dev/null; then
        log_message "INFO" "Adding repository: $repo"
        if [ -n "$key_url" ]; then
            wget -qO - "$key_url" | apt-key add - >> "$LOG_FILE" 2>&1
        fi
        echo "$repo" | tee /etc/apt/sources.list.d/$(echo "$repo" | sed 's/[^a-zA-Z0-9]/_/g').list
        apt-get update >> "$LOG_FILE" 2>&1
    fi
}

# Main installation function
main() {
    log_message "INFO" "=== Starting System Dependencies Installation ==="
    
    # Check if running as root
    if [ "$EUID" -ne 0 ]; then 
        log_message "ERROR" "This script must be run as root"
        exit 1
    fi
    
    # Update package lists
    log_message "INFO" "Updating package lists..."
    if ! apt-get update >> "$LOG_FILE" 2>&1; then
        log_message "ERROR" "Failed to update package lists"
        exit 1
    fi
    
    # Install basic dependencies
    log_message "INFO" "Installing basic dependencies..."
    for pkg in software-properties-common apt-transport-https ca-certificates gnupg2; do
        install_package $pkg || exit 1
    done
    
    # Add Docker repository
    add_repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
                   "https://download.docker.com/linux/ubuntu/gpg"
    
    # Add NodeSource repository
    if ! command_exists node; then
        log_message "INFO" "Adding NodeSource repository..."
        bash - >> "$LOG_FILE" 2>&1 < <(curl -fsSL https://deb.nodesource.com/setup_lts.x)
    fi
    
    # Add PostgreSQL repository
    add_repository "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" \
                   "https://www.postgresql.org/media/keys/ACCC4CF8.asc"
    
    # Update package lists again after adding repositories
    log_message "INFO" "Updating package lists after adding repositories..."
    apt-get update >> "$LOG_FILE" 2>&1
    
    # Install system packages
    log_message "INFO" "Installing required system packages..."
    for pkg in \
        # System utilities
        curl wget git unzip jq \
        # Build essentials
        build-essential libssl-dev zlib1g-dev libbz2-dev \
        libreadline-dev libsqlite3-dev llvm libncurses5-dev \
        libncursesw5-dev xz-utils tk-dev libffi-dev liblzma-dev \
        # Python development
        python3-pip python3-venv python3-dev python3-setuptools \
        # Database
        postgresql-15 postgresql-contrib-15 postgresql-client-15 \
        # Monitoring
        htop iftop iotop \
        # Network tools
        net-tools dnsutils iputils-ping \
        # Compression
        zip unzip rar unrar \
        # Version control
        git git-lfs \
        # Text processing
        vim nano \
        # Process management
        supervisor \
        # Security
        fail2ban ufw; do
        
        install_package $pkg || log_message "WARNING" "Failed to install $pkg, continuing..."
    done
    
    # Install Docker
    if ! command_exists docker; then
        log_message "INFO" "Installing Docker..."
        install_package docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
        
        # Add current user to docker group
        usermod -aG docker $SUDO_USER
        
        # Enable and start Docker service
        systemctl enable --now docker >> "$LOG_FILE" 2>&1
        
        # Verify Docker installation
        if docker --version >> "$LOG_FILE" 2>&1; then
            log_message "SUCCESS" "Docker installed successfully"
        else
            log_message "ERROR" "Docker installation failed"
            exit 1
        fi
    else
        log_message "INFO" "Docker is already installed"
    fi
    
    # Install Docker Compose
    if ! command_exists docker-compose; then
        log_message "INFO" "Installing Docker Compose..."
        DOCKER_COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep tag_name | cut -d '"' -f 4)
        curl -L "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        chmod +x /usr/local/bin/docker-compose
        
        # Verify Docker Compose installation
        if docker-compose --version >> "$LOG_FILE" 2>&1; then
            log_message "SUCCESS" "Docker Compose installed successfully"
        else
            log_message "ERROR" "Docker Compose installation failed"
            exit 1
        fi
    else
        log_message "INFO" "Docker Compose is already installed"
    fi
    
    # Install Node.js if not installed via NodeSource
    if ! command_exists node; then
        log_message "INFO" "Installing Node.js..."
        install_package nodejs
        
        # Install Yarn
        if ! command_exists yarn; then
            curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - >> "$LOG_FILE" 2>&1
            echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
            apt-get update >> "$LOG_FILE" 2>&1
            install_package yarn
        fi
        
        # Install global npm packages
        log_message "INFO" "Installing global npm packages..."
        npm install -g npm@latest pm2 >> "$LOG_FILE" 2>&1
    else
        log_message "INFO" "Node.js is already installed"
    fi
    
    # Install pyenv
    if [ ! -d "$HOME/.pyenv" ]; then
        log_message "INFO" "Installing pyenv..."
        curl https://pyenv.run | bash >> "$LOG_FILE" 2>&1
        
        # Add pyenv to shell configuration
        cat >> ~/.bashrc << 'EOL'
# Pyenv configuration
export PYENV_ROOT="$HOME/.pyenv"
command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
EOL
        
        # Source the updated .bashrc
        source ~/.bashrc
        
        # Install Python 3.9.0
        log_message "INFO" "Installing Python 3.9.0 using pyenv..."
        if pyenv install 3.9.0 >> "$LOG_FILE" 2>&1; then
            pyenv global 3.9.0
            log_message "SUCCESS" "Python 3.9.0 installed successfully"
        else
            log_message "ERROR" "Failed to install Python 3.9.0"
            exit 1
        fi
    else
        log_message "INFO" "pyenv is already installed"
    fi
    
    # Install pip packages
    log_message "INFO" "Installing Python packages..."
    pip3 install --upgrade pip >> "$LOG_FILE" 2>&1
    for pkg in virtualenv virtualenvwrapper pipenv; do
        pip3 install $pkg >> "$LOG_FILE" 2>&1
    done
    
    # Install additional tools
    log_message "INFO" "Installing additional tools..."
    for pkg in awscli serverless terraform ansible; do
        if ! command_exists $pkg; then
            install_package $pkg
        fi
    done
    
    # Configure system settings
    log_message "INFO" "Configuring system settings..."
    
    # Increase file watcher limit
    echo "fs.inotify.max_user_watches=524288" | tee -a /etc/sysctl.conf
    echo "fs.inotify.max_user_instances=512" | tee -a /etc/sysctl.conf
    sysctl -p >> "$LOG_FILE" 2>&1
    
    # Increase limits for the current user
    echo "* soft nofile 65535" | tee -a /etc/security/limits.conf
    echo "* hard nofile 65535" | tee -a /etc/security/limits.conf
    
    log_message "SUCCESS" "=== System Dependencies Installation Completed Successfully ==="
    log_message "INFO" "Please log out and log back in for all changes to take effect."
    log_message "INFO" "Installation log: $LOG_FILE"
}

# Execute main function
main "$@"
