// Dashboard de Métricas para GPTs Personalizados
// Autor: Equipo DevOps
// Propósito: Componente selector de GPT

import React from 'react';

const GptSelector = ({ gpts, seleccionado, onChange, cargando }) => {
  return (
    <div className="mb-4">
      <label htmlFor="gpt-selector" className="block text-sm font-medium text-gray-700 mb-1">
        Seleccionar GPT
      </label>
      <select
        id="gpt-selector"
        value={seleccionado}
        onChange={(e) => onChange(e.target.value)}
        disabled={cargando || gpts.length === 0}
        className="selector"
      >
        {cargando ? (
          <option value="">Cargando GPTs...</option>
        ) : gpts.length === 0 ? (
          <option value="">No hay GPTs disponibles</option>
        ) : (
          <>
            <option value="">Seleccionar GPT</option>
            {gpts.map((gpt) => (
              <option key={gpt.id} value={gpt.id}>
                {gpt.nombre}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
};

export default GptSelector;
