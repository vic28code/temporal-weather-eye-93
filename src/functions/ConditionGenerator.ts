// src/functions/ConditionGenerator.ts
import type { Condition, CurrentData } from '../types/DashboardTypes';

export const generateConditions = (
  current: CurrentData,
  currentLocationName: string
): Condition[] => {
  const conditions: Condition[] = [];

  const currentLocation = currentLocationName;

  if (current.temperature_2m >= 20 && current.temperature_2m <= 28 && current.precipitation === 0) {
    conditions.push({
      id: `cond-pleasant-temp-${Date.now()}-1`,
      type: 'Temperatura Agradable',
      description: `Disfruta de una temperatura ideal de ${current.temperature_2m}°C.`,
      level: 'Baja',
      location: currentLocation,
    });
  }

  if (current.relative_humidity_2m && current.relative_humidity_2m < 60) {
    conditions.push({
      id: `cond-low-humidity-${Date.now()}-2`,
      type: 'Humedad Baja',
      description: `Niveles de humedad confortables (${current.relative_humidity_2m}%).`,
      level: 'Baja',
      location: currentLocation,
    });
  }

  if (current.wind_speed_10m < 10) {
    conditions.push({
      id: `cond-light-wind-${Date.now()}-3`,
      type: 'Vientos Ligeros',
      description: `Vientos suaves de ${current.wind_speed_10m} km/h.`,
      level: 'Baja',
      location: currentLocation,
    });
  }

  const isClearOrPartlyCloudy = current.is_day && (current.precipitation === 0);
  if (isClearOrPartlyCloudy) {
    conditions.push({
      id: `cond-good-visibility-${Date.now()}-4`,
      type: 'Buena Visibilidad',
      description: 'Cielo despejado o parcialmente nublado, buena visibilidad.',
      level: 'Baja',
      location: currentLocation,
    });
  }

  if (current.temperature_2m > 30) {
    conditions.push({
      id: `alert-temp-high-${Date.now()}-1`,
      type: 'Alerta de Temperatura Extrema',
      description: `¡Alerta! Temperatura actual alta: ${current.temperature_2m}°C.`,
      level: 'Alta',
      location: currentLocation,
    });
  }

  if (current.temperature_2m < 10) {
    conditions.push({
      id: `alert-temp-low-${Date.now()}-2`,
      type: 'Alerta de Temperatura Fría',
      description: `¡Alerta! Temperatura actual baja: ${current.temperature_2m}°C.`,
      level: 'Media',
      location: currentLocation,
    });
  }

  if (current.precipitation > 0.5) {
    conditions.push({
      id: `alert-precip-${Date.now()}-3`,
      type: 'Alerta de Lluvia Significativa',
      description: `Se está registrando una precipitación de ${current.precipitation} mm.`,
      level: 'Media',
      location: currentLocation,
    });
  }

  return conditions;
};
