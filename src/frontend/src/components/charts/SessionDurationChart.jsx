// Dashboard de Métricas para GPTs Personalizados
// Autor: Equipo DevOps
// Propósito: Componente de gráfico para duración de sesiones

import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SessionDurationChart = ({ datos, cargando }) => {
  // Configuración y datos del gráfico usando memo para optimizar rendimiento
  const chartData = useMemo(() => {
    // Si estamos cargando o no hay datos, devolver datos vacíos
    if (cargando || !datos || !datos.distribucion) {
      return {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: 'rgba(99, 102, 241, 0.5)',
        }]
      };
    }

    // Extraer los datos para el gráfico
    const labels = datos.distribucion.map(item => item.rango);
    const cantidades = datos.distribucion.map(item => item.cantidad);

    return {
      labels,
      datasets: [
        {
          label: 'Número de Sesiones',
          data: cantidades,
          backgroundColor: 'rgba(99, 102, 241, 0.5)',
          borderColor: 'rgb(99, 102, 241)',
          borderWidth: 1,
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
      <h3 className="tarjeta-titulo">Distribución de Duración de Sesión</h3>
      {cargando ? (
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="h-40 w-full bg-gray-200 rounded"></div>
        </div>
      ) : datos && datos.distribucion ? (
        <div style={{ height: '300px' }}>
          <Bar data={chartData} options={options} />
        </div>
      ) : (
        <div className="flex justify-center items-center h-40 text-gray-400">
          No hay datos disponibles
        </div>
      )}
    </div>
  );
};

export default SessionDurationChart;
