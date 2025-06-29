// Dashboard de Métricas para GPTs Personalizados
// Autor: Equipo DevOps
// Propósito: Componente selector de rango de fechas

import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

// Registrar locale español
registerLocale('es', es);

const DateRangeSelector = ({ onChange }) => {
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);

  const handleFechaInicioChange = (date) => {
    setFechaInicio(date);
    // Solo notificar al padre si ambas fechas están seleccionadas o ambas son null
    onChange(date, fechaFin);
  };

  const handleFechaFinChange = (date) => {
    setFechaFin(date);
    // Solo notificar al padre si ambas fechas están seleccionadas o ambas son null
    onChange(fechaInicio, date);
  };

  const limpiarFechas = () => {
    setFechaInicio(null);
    setFechaFin(null);
    onChange(null, null);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Rango de Fechas
      </label>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <DatePicker
            selected={fechaInicio}
            onChange={handleFechaInicioChange}
            selectsStart
            startDate={fechaInicio}
            endDate={fechaFin}
            maxDate={new Date()}
            locale="es"
            dateFormat="dd/MM/yyyy"
            placeholderText="Fecha inicio"
            className="selector"
          />
        </div>
        <div>
          <DatePicker
            selected={fechaFin}
            onChange={handleFechaFinChange}
            selectsEnd
            startDate={fechaInicio}
            endDate={fechaFin}
            minDate={fechaInicio}
            maxDate={new Date()}
            locale="es"
            dateFormat="dd/MM/yyyy"
            placeholderText="Fecha fin"
            className="selector"
          />
        </div>
      </div>
      {(fechaInicio || fechaFin) && (
        <div className="mt-2">
          <button
            onClick={limpiarFechas}
            className="text-sm text-primary hover:text-primary-dark"
          >
            Limpiar filtro de fechas
          </button>
        </div>
      )}
    </div>
  );
};

export default DateRangeSelector;
