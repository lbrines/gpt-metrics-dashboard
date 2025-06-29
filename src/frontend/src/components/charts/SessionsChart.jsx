// Dashboard de Métricas para GPTs Personalizados
// Autor: Equipo DevOps
// Propósito: Componente de gráfico para sesiones a lo largo del tiempo

import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const SessionsChart = ({ datos, cargando }) => {
  // Configuración y datos del gráfico usando memo para optimizar rendimiento
  const chartData = useMemo(() => {
    // Si estamos cargando o no hay datos, devolver datos vacíos
    if (cargando || !datos || !datos.recuento_diario || datos.recuento_diario.length === 0) {
      return {
        labels: [],
        datasets: [{
          data: [],
          borderColor: 'rgb(99, 102, 241)',
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
        }]
      };
    }

    // Ordenar datos por fecha
    const datosOrdenados = [...datos.recuento_diario]
      .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

    // Extraer los datos para el gráfico
    const labels = datosOrdenados.map(item => {
      // Formatear fecha como 'DD/MM'
      const fecha = new Date(item.fecha);
      return `${fecha.getDate()}/${fecha.getMonth() + 1}`;
    });
    
    const cantidades = datosOrdenados.map(item => item.cantidad);

    return {
      labels,
      datasets: [
        {
          label: 'Sesiones',
          data: cantidades,
          borderColor: 'rgb(99, 102, 241)',
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
          tension: 0.3,
          fill: true,
        },
      ],
    };
  }, [datos, cargando]);

  // Opciones del gráfico
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.parsed.y} sesiones`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0
        }
      }
    }
  };

  return (
    <div className="tarjeta">
      <h3 className="tarjeta-titulo">Sesiones a lo Largo del Tiempo</h3>
      {cargando ? (
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="h-40 w-full bg-gray-200 rounded"></div>
        </div>
      ) : datos && datos.recuento_diario && datos.recuento_diario.length > 0 ? (
        <div style={{ height: '300px' }}>
          <Line data={chartData} options={options} />
        </div>
      ) : (
        <div className="flex justify-center items-center h-40 text-gray-400">
          No hay datos disponibles
        </div>
      )}
    </div>
  );
};

export default SessionsChart;
