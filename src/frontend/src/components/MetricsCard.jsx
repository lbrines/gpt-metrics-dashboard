// Dashboard de Métricas para GPTs Personalizados
// Autor: Equipo DevOps
// Propósito: Componente de tarjeta para mostrar métricas

import React from 'react';

const MetricsCard = ({ titulo, valor, unidad, icono, cargando }) => {
  return (
    <div className="tarjeta">
      <h3 className="tarjeta-titulo">{titulo}</h3>
      {cargando ? (
        <div className="animate-pulse flex space-x-4">
          <div className="h-10 w-full bg-gray-200 rounded"></div>
        </div>
      ) : (
        <div className="flex items-baseline">
          <span className="tarjeta-valor">{valor}</span>
          {unidad && <span className="text-lg ml-1">{unidad}</span>}
          {icono && <span className="ml-2">{icono}</span>}
        </div>
      )}
    </div>
  );
};

export default MetricsCard;
