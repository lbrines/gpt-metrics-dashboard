// Dashboard de Métricas para GPTs Personalizados
// Autor: Equipo DevOps
// Propósito: Configuración de Vite para el frontend

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000
  }
})
