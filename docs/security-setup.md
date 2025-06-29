# Security Configuration Guide - GPT Metrics Dashboard

## Overview

The GPT Metrics Dashboard API is secured using Bearer token authentication. Only authorized GPTs with the correct token can access the metrics endpoints.

## Setup Instructions

### 1. Generate a Secure Token

Generate a cryptographically secure token using Python:

```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

Example output: `00e1d8925150c33e169b7d45320bc90b7eb2a2962c1928627dfaac73edf4747c`

### 2. Environment Configuration

Create a `.env` file in the backend directory with the following variables:

```bash
# Database configuration
DATABASE_URL=postgresql://admin:adminpassword@postgres:5432/metricas_gpt

# Server configuration  
DEBUG=false
CORS_ORIGINS=http://localhost:3000,https://koomtai.com

# Security configuration - GPT Authentication Token
GPT_API_TOKEN=YOUR_GENERATED_TOKEN_HERE
```

**Important Security Notes:**
- Token must be at least 32 characters long
- Never commit the `.env` file to version control
- Change the token in production environments
- Keep the token secure and share only with authorized GPTs

## Protected Endpoints

The following endpoints require Bearer token authentication:

### Main Application Endpoints
- `POST /api/sync-gpts` - Synchronize GPT configuration
- `GET /api/gpts-db` - Get GPTs from database
- `POST /api/sessions-by-code` - Create session by GPT code

### Session Management
- `POST /api/sessions` - Create new session
- `GET /api/sessions` - List sessions
- `GET /api/sessions/{id}` - Get specific session
- `PUT /api/sessions/{id}` - Update session

### Event Management
- `POST /api/events` - Create new event
- `GET /api/events` - List events
- `GET /api/events/{id}` - Get specific event

### Metrics Endpoints
- `GET /api/metrics/messages-per-session` - Messages per session metrics
- `GET /api/metrics/response-time` - Response time metrics
- `GET /api/metrics/session-duration` - Session duration metrics
- `GET /api/metrics/sessions-count` - Session count metrics

## Public Endpoints (No Authentication Required)

- `GET /` - API root endpoint
- `GET /api/health` - Health check
- `GET /api/gpts` - List GPTs from configuration file

## Usage Examples

### Using curl

```bash
# Set your token
export TOKEN="your_generated_token_here"

# Create a session
curl -X POST "https://koomtai.com/api/sessions-by-code" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "gpt_code": "devops-expert",
    "usuario_id": "user-123",
    "timestamp_inicio": "2025-06-29T20:00:00.000Z"
  }'

# Get sessions
curl -X GET "https://koomtai.com/api/sessions" \
  -H "Authorization: Bearer $TOKEN"

# Get metrics
curl -X GET "https://koomtai.com/api/metrics/messages-per-session" \
  -H "Authorization: Bearer $TOKEN"
```

### Using JavaScript (for GPT Actions)

```javascript
const API_BASE = 'https://koomtai.com/api';
const GPT_TOKEN = 'your_generated_token_here';

// Create session
async function createSession(gptCode, userId) {
  const response = await fetch(`${API_BASE}/sessions-by-code`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GPT_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      gpt_code: gptCode,
      usuario_id: userId,
      timestamp_inicio: new Date().toISOString()
    })
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return await response.json();
}

// Create event
async function createEvent(sessionId, eventType, content) {
  const response = await fetch(`${API_BASE}/events`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GPT_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      sesion_id: sessionId,
      tipo: eventType,
      contenido: content
    })
  });
  
  return await response.json();
}
```

### Using Python

```python
import requests
import os
from datetime import datetime

API_BASE = 'https://koomtai.com/api'
GPT_TOKEN = os.getenv('GPT_API_TOKEN', 'your_token_here')

headers = {
    'Authorization': f'Bearer {GPT_TOKEN}',
    'Content-Type': 'application/json'
}

# Create session
def create_session(gpt_code, user_id):
    data = {
        'gpt_code': gpt_code,
        'usuario_id': user_id,
        'timestamp_inicio': datetime.utcnow().isoformat() + 'Z'
    }
    
    response = requests.post(
        f'{API_BASE}/sessions-by-code',
        json=data,
        headers=headers
    )
    
    response.raise_for_status()
    return response.json()

# Create event
def create_event(session_id, event_type, content):
    data = {
        'sesion_id': session_id,
        'tipo': event_type,
        'contenido': content
    }
    
    response = requests.post(
        f'{API_BASE}/events',
        json=data,
        headers=headers
    )
    
    return response.json()
```

## Error Responses

### 401 Unauthorized
```json
{
  "detail": "Token de autenticación requerido"
}
```

### 401 Invalid Token
```json
{
  "detail": "Token de autenticación inválido"
}
```

### 500 Server Configuration Error
```json
{
  "detail": "Token de API no configurado en el servidor"
}
```

## Testing Authentication

### Test without token (should fail)
```bash
curl -X GET "https://koomtai.com/api/sessions"
# Expected: 401 Unauthorized
```

### Test with invalid token (should fail)
```bash
curl -X GET "https://koomtai.com/api/sessions" \
  -H "Authorization: Bearer invalid_token"
# Expected: 401 Unauthorized
```

### Test with valid token (should succeed)
```bash
curl -X GET "https://koomtai.com/api/sessions" \
  -H "Authorization: Bearer your_valid_token_here"
# Expected: 200 OK with session data
```

## Deployment Checklist

- [ ] Generate secure token with `python -c "import secrets; print(secrets.token_hex(32))"`
- [ ] Create `.env` file with `GPT_API_TOKEN=your_token`
- [ ] Verify token is at least 32 characters
- [ ] Test authentication with curl/httpie
- [ ] Share token securely with GPT developers
- [ ] Add `.env` to `.gitignore`
- [ ] Document token location for team members 