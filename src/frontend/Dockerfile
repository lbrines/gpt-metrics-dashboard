FROM node:18-alpine

# Configurar directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos
COPY . .

# Comando para ejecutar en desarrollo
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
