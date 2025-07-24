// src/functions/AlertGenerator.ts
import type { Alert, CurrentData } from '../types/DashboardTypes';

// Asumo que esta función existe en tu proyecto.
// Si no la estás usando o no la necesitas, puedes considerar eliminar el archivo.
export const generateAlerts = (
  current: CurrentData,
  // ELIMINADO: daily ya no se usa en esta función
  // daily: DailyData, // Comentado o eliminado para resolver TS6133
  locationName: string // Asumo que también recibe el nombre de la ubicación
): Alert[] => {
  const alerts: Alert[] = [];
  const now = new Date();
  const currentTime = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

  // Ejemplo de reglas de alerta
  if (current.temperature_2m > 30) {
    alerts.push({
      id: `alert-high-temp-${Date.now()}-1`,
      type: 'Alerta de Calor Extremo',
      message: `¡Advertencia! Temperatura muy alta en ${locationName}: ${current.temperature_2m}°C.`,
      level: 'Alta',
      time: currentTime,
      location: locationName,
    });
  }

  if (current.wind_speed_10m > 25) {
    alerts.push({
      id: `alert-strong-wind-${Date.now()}-2`,
      type: 'Alerta de Vientos Fuertes',
      message: `¡Precaución! Vientos fuertes en ${locationName}: ${current.wind_speed_10m} km/h.`,
      level: 'Media',
      time: currentTime,
      location: locationName,
    });
  }

  return alerts;
};
