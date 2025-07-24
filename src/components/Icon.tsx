import type { FC } from 'react';
import React from 'react';
interface IconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

const Icon: FC<IconProps> = ({ name, size = 20, color = '#333', className = '' }) => {
  const getIconContent = (iconName: string) => {
    switch (iconName) {
      case 'cloud-sun': return '☀️';
      case 'alert': return '⚠️'; // Icono para alertas
      case 'info': return 'ℹ️';
      case 'location': return '📍'; // Icono de ubicación
      case 'refresh': return '🔄';
      case 'settings': return '⚙️';
      case 'sunrise': return '🌅';
      case 'sunset': return '🌇';
      case 'humidity': return '💧'; // NUEVO para indicadores
      case 'temperature': return '🌡️'; // NUEVO para indicadores
      case 'pressure': return '⏱️'; // NUEVO para indicadores
      case 'wind': return '💨'; // NUEVO para indicadores
      case 'rain': return '☔'; // NUEVO para alertas de lluvia
      case 'calendar': return '🗓️'; // Para el botón "Hoy" en el gráfico (opcional)
      case 'location-pin': return '📍'; // Agregado para ConditionCard y AlertCard
      case 'thermometer': return '🌡️';
      case 'eye': return '👁️';
      case 'sun': return '☀️';
      case 'air-quality': return '💨';
      case 'snow': return '❄️';
      default: return '';
    }
  };

  return (
    <span className={`icon ${className}`} style={{ fontSize: size, color: color, display: 'inline-block', verticalAlign: 'middle' }}>
      {getIconContent(name)}
    </span>
  );
};

export default Icon;