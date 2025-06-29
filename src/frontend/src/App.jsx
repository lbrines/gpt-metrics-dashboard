// Dashboard de Métricas para GPTs Personalizados
// Autor: Equipo DevOps
// Propósito: Componente principal de la aplicación

import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import GptSelector from './components/GptSelector'
import DateRangeSelector from './components/DateRangeSelector'
import { obtenerGPTs } from './services/api'

function App() {
  const [gpts, setGpts] = useState([])
  const [gptSeleccionado, setGptSeleccionado] = useState('')
  const [rangoFechas, setRangoFechas] = useState({
    fechaInicio: null,
    fechaFin: null
  })
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  // Cargar la lista de GPTs disponibles al iniciar
  useEffect(() => {
    const cargarGPTs = async () => {
      try {
        setCargando(true)
        const listaGPTs = await obtenerGPTs()
        setGpts(listaGPTs)
        
        // Seleccionar el primer GPT por defecto si hay alguno
        if (listaGPTs.length > 0) {
          setGptSeleccionado(listaGPTs[0].id)
        }
        
        setCargando(false)
      } catch (err) {
        setError('Error al cargar los GPTs disponibles')
        setCargando(false)
        console.error('Error al cargar GPTs:', err)
      }
    }

    cargarGPTs()
  }, [])

  // Manejar cambio de GPT seleccionado
  const handleGptChange = (id) => {
    setGptSeleccionado(id)
  }

  // Manejar cambio en el rango de fechas
  const handleFechaChange = (fechaInicio, fechaFin) => {
    setRangoFechas({ fechaInicio, fechaFin })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Dashboard de Métricas GPT</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <GptSelector 
                gpts={gpts} 
                seleccionado={gptSeleccionado} 
                onChange={handleGptChange} 
                cargando={cargando} 
              />
            </div>
            <div>
              <DateRangeSelector onChange={handleFechaChange} />
            </div>
          </div>
        </div>
        
        {cargando ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <Dashboard 
            gptId={gptSeleccionado} 
            fechaInicio={rangoFechas.fechaInicio} 
            fechaFin={rangoFechas.fechaFin} 
          />
        )}
      </main>
      
      <footer className="bg-white shadow-inner mt-8">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm text-gray-500">
          Dashboard de Métricas GPT &copy; {new Date().getFullYear()} - Equipo DevOps
        </div>
      </footer>
    </div>
  )
}

export default App
