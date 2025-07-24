
import { useState, useEffect } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';
interface FetchParams {
  latitude: number;
  longitude: number;
  timezone: string;
  refreshTrigger: number;
}
export interface CurrentData {
  time: string;
  interval: number;
  temperature_2m: number;
  is_day: number;
  wind_speed_10m: number;
  precipitation: number;
  relative_humidity_2m?: number;
  pressure_msl?: number;
  wind_direction_10m?: number;
}

export interface KeyIndicator {
  id: string;
  label: string;
  value: string;
  unit: string;
  change: string;
  icon: string;
  gradient?: string;
  bgColor?: string;
}

export interface HourlyData {
  time: string[];
  temperature_2m: number[];
  rain: number[];
  weather_code: number[];
  evapotranspiration: number[];
  precipitation_probability: number[];
  apparent_temperature: number[];
  relative_humidity_2m?: number[];
  pressure_msl?: number[];
  wind_speed_10m?: number[];
  wind_direction_10m?: number[];
}

export interface DailyData {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise?: string[];
  sunset?: string[];
  wind_speed_10m_max?: number[];
  wind_direction_10m_dominant?: number[];
}
export interface Alert {
  id: number;
  type: string;
  location: string;
  level: 'Baja' | 'Media' | 'Alta';
  description: string;
  time: string;
  icon: string;
}

export interface Condition {
  id: number;
  type: string;
  value: string;
  description: string;
  icon: string;
}

export interface LocationData {
  latitude: number;
  longitude: number;
  timezone: string;
}

export type LocationName = 'Guayaquil, Ecuador' | 'Bogotá, Colombia' | 'Buenos Aires, Argentina' | 'Lima, Perú' | 'Santiago, Chile';

export interface LocationSelectorProps {
  currentLocation: LocationName;
  onLocationChange: (locationName: LocationName) => void;
  availableLocations: { [key in LocationName]: LocationData };
}

export const useDataFetcher = ({ latitude, longitude, timezone, refreshTrigger }: FetchParams) => {
  const [data, setData] = useState<OpenMeteoResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      console.log(`[DataFetcher] Iniciando fetch de datos para: Lat ${latitude}, Lon ${longitude}, TZ ${timezone}. Disparador: ${refreshTrigger}`); // <-- ¡AÑADE ESTO!
      try {
        const URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&current=temperature_2m,is_day,wind_speed_10m,precipitation,relative_humidity_2m,pressure_msl,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,pressure_msl,wind_speed_10m,wind_direction_10m,weather_code,rain,precipitation_probability,apparent_temperature,evapotranspiration&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,weather_code,wind_speed_10m_max,wind_direction_10m_dominant`;

        const response = await fetch(URL);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error HTTP: ${response.status} - ${response.statusText}. Detalles: ${errorText}`);
        }
        const jsonData: OpenMeteoResponse = await response.json();
        console.log("[DataFetcher] Datos recibidos:", jsonData);
        console.log("[DataFetcher] Hora de la observación actual:", jsonData?.current?.time);
        setData(jsonData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Un error desconocido ocurrió.");
        }
        console.error("[DataFetcher] Error durante el fetch:", err);
      } finally {
        setLoading(false);
        console.log("[DataFetcher] Fetch finalizado. Loading:", false);
      }
    };

    fetchData();
  }, [latitude, longitude, timezone, refreshTrigger]);

  return { data, loading, error };
};