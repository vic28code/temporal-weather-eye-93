// src/types/DashboardTypes.tsx

export interface Alert {
  id: string;
  type: string;
  message: string;
  level: string;
  time: string;
  location: string;
}

export interface Condition {
  id: string;
  type: string;
  description: string;
  level: string;
  time?: string;
  location: string;
}

export interface KeyIndicator {
  id: string;
  label: string;
  value: string;
  unit: string;
  change?: string;
  icon: string;
  gradient: string;
  bgColor?: string;
  textColor?: string;
}

export interface CurrentData {
  time: string;
  interval: number;
  temperature_2m: number;
  is_day: number;
  wind_speed_10m: number;
  precipitation: number;
  relative_humidity_2m: number;
  pressure_msl: number;
  wind_direction_10m: number;
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

export interface ChartHourlyData {
  time: string;
  temperature_2m: number | null;
  precipitation: number | null;
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

export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: any;
  current: CurrentData;
  hourly_units: any;
  hourly: HourlyData;
  daily_units: any;
  daily: DailyData;
}

export interface Location {
  latitude: number;
  longitude: number;
  timezone: string;
}

export type LocationName = "Pichincha" | "Guayas" | "Azuay" | "Manabí" | "El Oro" | "Loja";

export interface LocationSelectorProps {
  currentLocationName: LocationName;
  onLocationChange: (locationName: LocationName) => void;
  availableLocations: { [key in LocationName]: Location };
  hourlyData?: HourlyData;
}