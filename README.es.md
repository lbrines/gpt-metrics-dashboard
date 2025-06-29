# Dashboard de Métricas para GPTs Personalizados

## Descripción
Dashboard para visualizar métricas implícitas de varios GPTs personalizados. Construido con FastAPI, PostgreSQL, React (Vite + Tailwind) y Docker Compose.

## Estructura del Proyecto
```
dashboard-metricas-gpt/
├── docker-compose.yml       # Configuración de servicios Docker
├── docker-compose.prod.yml  # Configuración para producción
├── .env.example            # Variables de entorno de ejemplo
├── .gitignore              # Reglas de Git
├── README.md               # Versión en inglés
├── README.es.md            # Este archivo
├── test.sh                 # Script para verificar el estado del sistema
├── scripts/                # Scripts de automatización
│   ├── install.sh          # Script principal de instalación
│   ├── setup/              # Scripts de configuración
│   │   ├── install_dependencies.sh
│   │   ├── configure_firewall.sh
│   │   └── configure_nginx.sh
│   ├── db/                 # Scripts de base de datos
│   │   ├── setup_db.sh
│   │   ├── backup_db.sh
│   │   └── restore_db.sh
│   ├── ssl/                # Configuración SSL
│   │   └── configure_ssl.sh
│   └── test/               # Scripts de prueba
│       └── test_installation.sh
├── data/                   # Datos persistentes
│   └── db/                 # Datos de PostgreSQL
├── init-scripts/           # Inicialización de base de datos
│   └── 01-init-extensions.sql
└── src/                    # Código fuente de la aplicación
    ├── backend/            # API con FastAPI
    │   ├── Dockerfile
    │   ├── requirements.txt
    │   └── app/...
    └── frontend/           # Interfaz con React + Vite + Tailwind
        ├── Dockerfile
        ├── index.html
        ├── package.json
        └── src/...
```

## Requisitos
- Docker y Docker Compose
- Ubuntu 24.04 (recomendado como host)

## Instalación y Ejecución

### 1. Clonar el repositorio
```bash
git clone git@github.com:lbrines/gpt-metrics-dashboard.git
cd dashboard-metricas-gpt
```

### 2. Instalación Automatizada (Recomendada)

#### Para Desarrollo:
```bash
# Hacer ejecutable el script de instalación
chmod +x scripts/install.sh

# Ejecutar la instalación con configuraciones predeterminadas
sudo ./scripts/install.sh
```

#### Para Producción:
```bash
# Establecer tu dominio (reemplaza ejemplo.com con tu dominio)
export DOMAIN=ejemplo.com

# Establecer credenciales de base de datos (o deja que el script las genere)
export DB_USER=usuario_dashboard
export DB_PASS=$(openssl rand -hex 16)
export DB_NAME=dashboard_metricas

# Ejecutar la instalación
sudo ./scripts/install.sh
```

### 3. Instalación Manual (Alternativa)

#### 2.1 Instalar Dependencias
```bash
sudo ./scripts/setup/install_dependencies.sh
```

#### 2.2 Configurar Base de Datos
```bash
# Establecer credenciales de base de datos (o usa los valores predeterminados)
export DB_USER=usuario_dashboard
export DB_PASS=$(openssl rand -hex 16)
export DB_NAME=dashboard_metricas

# Ejecutar configuración de base de datos
sudo ./scripts/db/setup_db.sh
```

#### 2.3 Configurar SSL (Solo Producción)
```bash
# Establecer tu dominio
export DOMAIN=ejemplo.com

# Configurar SSL
sudo ./scripts/ssl/configure_ssl.sh
```

#### 2.4 Configurar Firewall
```bash
sudo ./scripts/setup/configure_firewall.sh
```

#### 2.5 Iniciar Servicios
```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### 4. Verificar la Instalación
```bash
# Ejecutar pruebas completas
./scripts/test/test_installation.sh

# O usar la prueba simplificada
./test.sh
```

## Acceso a la Aplicación

### Entorno de Desarrollo
- **Dashboard (Frontend):** http://localhost:3000
- **API (Backend):** http://localhost:8000
- **Documentación API:** http://localhost:8000/docs

### Entorno de Producción (si se configuró con un dominio)
- **Dashboard (Frontend):** https://tudominio.com
- **API (Backend):** https://tudominio.com/api
- **Documentación API:** https://tudominio.com/api/docs

## Variables de Entorno

### Requeridas para Producción
- `DOMAIN`: Nombre de tu dominio (ejemplo: ejemplo.com)
- `DB_USER`: Usuario de la base de datos (predeterminado: usuario_dashboard)
- `DB_PASS`: Contraseña de la base de datos (se genera automáticamente si no se proporciona)
- `DB_NAME`: Nombre de la base de datos (predeterminado: dashboard_metricas)
- `SECRET_KEY`: Clave secreta para la aplicación (se genera automáticamente si no se proporciona)

### Opcionales
- `APP_ENV`: Entorno de la aplicación (development, production, test)
- `VITE_API_URL`: URL de la API para el frontend (se configura automáticamente según el dominio)

## Métricas disponibles
- **Mensajes por sesión**: Total de eventos "user_message" ÷ Total de sesiones
- **Tiempo promedio de respuesta**: Promedio de latency_ms en eventos "response"
- **Distribución de duración de sesiones**: Histograma con rangos de tiempo
- **Recuento diario de sesiones**: Cantidad de sesiones agrupadas por fecha

## Desarrollo

### Modo de desarrollo en caliente
La configuración actual incluye bind mounts para desarrollo en caliente, por lo que cualquier cambio en el código fuente del backend o frontend se reflejará automáticamente.

### Base de datos
- **Host**: localhost:5432
- **Usuario**: admin
- **Contraseña**: adminpassword
- **Base de datos**: metricas_gpt

### Estructura de la base de datos
- **gpts**: Información básica de cada GPT
- **sesiones**: Registro de sesiones de usuario con GPTs
- **eventos**: Eventos durante cada sesión (mensajes, respuestas, etc.)

## Mantenimiento

### Respaldar Base de Datos
```bash
# Crear un respaldo
./scripts/db/backup_db.sh

# Restaurar desde un respaldo
./scripts/db/restore_db.sh archivo_respaldo.sql
```

### Restablecer Datos
```bash
# Detener y eliminar todos los contenedores
docker compose down

# Eliminar volumen de base de datos (ADVERTENCIA: Esto borrará todos los datos)
sudo rm -rf ./data/db/*

# Iniciar servicios nuevamente
docker compose up -d
```

### Registros
```bash
# Ver registros de todos los servicios
docker compose logs -f

# Ver registros de un servicio específico
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f postgres

# Ver registros de Nginx
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### Mantenimiento del Sistema
```bash
# Actualizar todos los contenedores
docker compose pull
docker compose up -d --force-recreate

# Limpiar recursos no utilizados
docker system prune -f
docker volume prune -f
```

## Seguridad

### Reglas del Firewall
El script de instalación configura UFW con las siguientes reglas:
- Permitir SSH (puerto 22, con límite de tasa)
- Permitir HTTP (puerto 80)
- Permitir HTTPS (puerto 443)
- Permitir puertos de Docker Swarm (si es necesario)
- Permitir puertos de la aplicación (3000, 8000, 5432)

### Configuración SSL
- Usa Let's Encrypt para certificados SSL en producción
- Renovación automática configurada vía cron
- Configuración SSL/TLS segura con cifrados modernos
- Redirección HTTP a HTTPS
- HSTS habilitado

### Seguridad de la Base de Datos
- Contraseñas generadas aleatoriamente si no se proporcionan
- Privilegios limitados para el usuario de la base de datos
- Conexiones restringidas a localhost/red de Docker
- Se recomiendan copias de seguridad regulares

## Solución de Problemas

### Problemas Comunes

#### Conflictos de Puertos
Si encuentras conflictos de puertos, verifica qué servicio está usando el puerto:
```bash
sudo lsof -i :<puerto>
sudo netstat -tulpn | grep <puerto>
```

#### Problemas con Certificados
Para problemas con certificados Let's Encrypt:
```bash
# Verificar estado de los certificados
sudo certbot certificates

# Renovar certificados manualmente
sudo certbot renew --dry-run
```

#### Problemas con Docker
```bash
# Verificar estado de los contenedores
docker ps -a

# Ver registros de un contenedor
docker logs <id_contenedor>

# Reiniciar un contenedor
docker restart <id_contenedor>
```

## Configuración de GPTs con OpenAI Actions

# Guía Genérica para Configurar un GPT con Actions

Esta guía te servirá como referencia o como **prompt** que le puedes dar a un LLM para que genere automáticamente la documentación de configuración de un GPT que use OpenAI Actions (acciones HTTP).

---

## 1. Objetivo

Documentar paso a paso cómo:

1. Configurar la **autenticación** (API Key, Bearer, OAuth).
2. Definir el **schema OpenAPI** de los endpoints.
3. Registrar las **acciones** (Available Actions) que el GPT podrá invocar.
4. Añadir la **privacy policy**.
5. Probar, publicar y compartir el GPT.

---

## 2. Estructura del Prompt para el LLM

```text
Eres un experto en integración de GPTs con OpenAI Actions. Necesito que generes la documentación completa, en **Markdown**, para un GPT que:

1. Se autentica mediante **[API Key | Bearer | OAuth2]**.
2. Mantiene un esquema OpenAPI versión **3.1.0** que incluye estos endpoints:
   - **POST /sessions**: crea una nueva sesión.
   - **POST /events**: registra un evento (user_message, response, error).
   - **PUT /sessions/{session_id}**: actualiza la sesión (ended_at, duration_ms).
3. Explica cómo rellenar el campo **Schema** en la UI de "Add actions".
4. Muestra cómo verificar que las **Available Actions** se detectan correctamente.
5. Indica dónde y cómo pegar la **Privacy Policy**.
6. Describe los pasos de **prueba** (Test button) y **publicación** (Publish/Update).
7. Añade ejemplos de llamadas de prueba con `curl` y cómo ver los resultados en un dashboard React.
8. Da consejos de buenas prácticas: nombres de `operationId`, manejo de errores, seguridad de tokens, versión del OpenAPI.

Mantén la guía lo más **genérica** posible para que sirva a cualquier proyecto con arquitectura similar (FastAPI, Node.js, Docker, etc.).  
Devuélvelo en un **solo** documento Markdown, con títulos, secciones, ejemplos de código y tips.
```

---

## 3. Ejemplo de Salida Esperada

Al pasar el prompt anterior, el LLM debería generar algo como esto en Markdown:

```markdown
# Configuración de GPT con OpenAI Actions

## 1. Autenticación
- Tipo: API Key (Bearer)
- Header: `Authorization: Bearer <YOUR_TOKEN>`

## 2. OpenAPI Schema
```yaml
openapi: 3.1.0
info: …
paths: …
components: …
```

## 3. Available Actions

* `createSession` → POST `/sessions`
* `createEvent`   → POST `/events`
* `updateSession` → PUT `/sessions/{session_id}`

## 4. Privacy Policy

* URL: `https://miapp.example.com/privacy`

## 5. Pruebas

```bash
curl -X POST https://api.example.com/sessions \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"user_id":"u1"}'
```

## 6. Publicación

* Haz clic en **Publish** para activar los cambios.

## Buenas Prácticas

* Usa `operationId` único.
* Mantén el schema validado con `Format`.
* No expongas tu token en repos públicos.

```

---

## 4. Cómo Usar Esta Guía

1. **Copia** la sección "Estructura del Prompt…" y pégala en la conversación con el LLM.  
2. El LLM devolverá automáticamente la documentación completa en Markdown.  
3. **Ajusta** los nombres de rutas, esquemas y tokens según tu proyecto concreto.  
4. **Publica** el GPT y compártelo con tu equipo.

Con este prompt y estructura tendrás siempre a mano una guía para documentar y configurar tus GPTs con Actions de forma rápida y estandarizada.

## Contribución
1. Haz un fork del repositorio
2. Crea una rama para tu función (`git checkout -b feature/MiFuncion`)
3. Haz commit de tus cambios (`git commit -am 'Añadir alguna función'`)
4. Haz push a la rama (`git push origin feature/MiFuncion`)
5. Abre un Pull Request

## Licencia
Distribuido bajo la Licencia MIT. Consulta el archivo `LICENSE` para más información.

