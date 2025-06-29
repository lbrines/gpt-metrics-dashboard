# Guía de Integración para GPTs

## Configuración del GPT "DevOps Expert"

### 1. Información del GPT
- **Código**: `devops-expert`
- **Nombre**: DevOps Expert
- **Dashboard URL**: https://koomtai.com
- **API Base URL**: https://koomtai.com/api

### 2. Endpoints Disponibles

#### Crear Sesión
```bash
POST https://koomtai.com/api/sessions
Content-Type: application/json

{
  "gpt_id": "devops-expert",
  "usuario_id": "usuario123",
  "timestamp_inicio": "2025-06-29T20:00:00.000Z"
}
```

#### Agregar Evento
```bash
POST https://koomtai.com/api/events
Content-Type: application/json

{
  "sesion_id": "uuid-de-la-sesion",
  "tipo": "consulta",
  "contenido": "¿Cómo configuro un pipeline CI/CD con Docker?",
  "latency_ms": 1500,
  "tokens_entrada": 25,
  "tokens_salida": 150
}
```

### 3. Código de Ejemplo para GPT

#### JavaScript/Node.js
```javascript
class DevOpsMetrics {
  constructor() {
    this.baseURL = 'https://koomtai.com/api';
    this.gptId = 'devops-expert';
  }

  async createSession(userId) {
    const response = await fetch(`${this.baseURL}/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        gpt_id: this.gptId,
        usuario_id: userId,
        timestamp_inicio: new Date().toISOString()
      })
    });
    
    const session = await response.json();
    return session.id;
  }

  async logEvent(sessionId, eventType, content, latency, tokensIn, tokensOut) {
    await fetch(`${this.baseURL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sesion_id: sessionId,
        tipo: eventType,
        contenido: content,
        latency_ms: latency,
        tokens_entrada: tokensIn,
        tokens_salida: tokensOut,
        timestamp: new Date().toISOString()
      })
    });
  }
}

// Uso del código
const metrics = new DevOpsMetrics();

async function handleUserQuery(userId, userQuery) {
  const startTime = Date.now();
  
  // Crear sesión
  const sessionId = await metrics.createSession(userId);
  
  // Procesar consulta (tu lógica aquí)
  const response = await processDevOpsQuery(userQuery);
  
  // Calcular métricas
  const latency = Date.now() - startTime;
  const tokensIn = countTokens(userQuery);
  const tokensOut = countTokens(response);
  
  // Registrar evento
  await metrics.logEvent(
    sessionId,
    'consulta',
    userQuery,
    latency,
    tokensIn,
    tokensOut
  );
  
  return response;
}
```

#### Python
```python
import requests
import json
from datetime import datetime
import uuid

class DevOpsMetrics:
    def __init__(self):
        self.base_url = 'https://koomtai.com/api'
        self.gpt_id = 'devops-expert'
    
    def create_session(self, user_id):
        payload = {
            'gpt_id': self.gpt_id,
            'usuario_id': user_id,
            'timestamp_inicio': datetime.utcnow().isoformat() + 'Z'
        }
        
        response = requests.post(
            f'{self.base_url}/sessions',
            headers={'Content-Type': 'application/json'},
            data=json.dumps(payload)
        )
        
        return response.json()['id']
    
    def log_event(self, session_id, event_type, content, latency, tokens_in, tokens_out):
        payload = {
            'sesion_id': session_id,
            'tipo': event_type,
            'contenido': content,
            'latency_ms': latency,
            'tokens_entrada': tokens_in,
            'tokens_salida': tokens_out,
            'timestamp': datetime.utcnow().isoformat() + 'Z'
        }
        
        requests.post(
            f'{self.base_url}/events',
            headers={'Content-Type': 'application/json'},
            data=json.dumps(payload)
        )

# Uso del código
metrics = DevOpsMetrics()

def handle_user_query(user_id, user_query):
    import time
    start_time = time.time()
    
    # Crear sesión
    session_id = metrics.create_session(user_id)
    
    # Procesar consulta (tu lógica aquí)
    response = process_devops_query(user_query)
    
    # Calcular métricas
    latency = int((time.time() - start_time) * 1000)
    tokens_in = count_tokens(user_query)
    tokens_out = count_tokens(response)
    
    # Registrar evento
    metrics.log_event(
        session_id,
        'consulta',
        user_query,
        latency,
        tokens_in,
        tokens_out
    )
    
    return response
```

### 4. Tipos de Eventos Recomendados

Para el GPT "DevOps Expert", considera estos tipos de eventos:

- **`consulta`**: Preguntas generales sobre DevOps
- **`configuracion`**: Ayuda con configuraciones específicas
- **`troubleshooting`**: Resolución de problemas
- **`pipeline`**: Consultas sobre CI/CD
- **`infraestructura`**: Temas de infraestructura como código
- **`monitoreo`**: Configuración de monitoring y alertas
- **`seguridad`**: Mejores prácticas de seguridad DevOps

### 5. Ejemplos de Contenido por Tipo

#### Consulta General
```json
{
  "tipo": "consulta",
  "contenido": "¿Cuáles son las mejores prácticas para un pipeline CI/CD?",
  "latency_ms": 1200,
  "tokens_entrada": 12,
  "tokens_salida": 180
}
```

#### Configuración
```json
{
  "tipo": "configuracion",
  "contenido": "Ayúdame a configurar Docker Compose para un stack LAMP",
  "latency_ms": 2100,
  "tokens_entrada": 15,
  "tokens_salida": 250
}
```

#### Troubleshooting
```json
{
  "tipo": "troubleshooting",
  "contenido": "Mi pipeline de Jenkins falla en el step de testing",
  "latency_ms": 1800,
  "tokens_entrada": 18,
  "tokens_salida": 200
}
```

### 6. Testing de la Integración

Puedes probar la integración usando curl:

```bash
# Crear sesión
SESSION_RESPONSE=$(curl -s -X POST https://koomtai.com/api/sessions \
  -H "Content-Type: application/json" \
  -d '{
    "gpt_id": "devops-expert",
    "usuario_id": "test-user-123",
    "timestamp_inicio": "'$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)'"
  }')

SESSION_ID=$(echo $SESSION_RESPONSE | jq -r '.id')

# Agregar evento
curl -X POST https://koomtai.com/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "sesion_id": "'$SESSION_ID'",
    "tipo": "consulta",
    "contenido": "¿Cómo configuro un pipeline CI/CD con Docker?",
    "latency_ms": 1500,
    "tokens_entrada": 25,
    "tokens_salida": 150,
    "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)'"
  }'
```

### 7. Monitoreo en el Dashboard

Una vez que tu GPT esté enviando métricas, podrás ver en https://koomtai.com:

- **Sesiones activas** por día/semana/mes
- **Tipos de consultas** más frecuentes
- **Latencia promedio** de respuestas
- **Uso de tokens** (entrada y salida)
- **Patrones de uso** por usuario
- **Gráficos de rendimiento** en tiempo real

### 8. Mejores Prácticas

1. **Identificadores únicos**: Usa UUIDs para usuarios y sesiones
2. **Timestamps UTC**: Siempre en formato ISO 8601
3. **Manejo de errores**: Implementa retry logic para llamadas API
4. **Rate limiting**: Respeta los límites de la API
5. **Datos sensibles**: No incluyas información personal en el contenido
6. **Batch processing**: Para alto volumen, considera enviar métricas en lotes

### 9. Troubleshooting

#### Error 404 - GPT no encontrado
- Verifica que el `gpt_id` sea exactamente `devops-expert`
- Confirma que el GPT esté configurado en el dashboard

#### Error 422 - Datos inválidos
- Revisa el formato de timestamps (ISO 8601)
- Verifica que todos los campos requeridos estén presentes

#### Error 500 - Error del servidor
- Revisa los logs del dashboard
- Contacta al administrador del sistema 