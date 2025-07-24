// src/functions/KeyIndicatorGenerator.ts
import type { CurrentData, DailyData, KeyIndicator } from '../types/DashboardTypes';

export const generateKeyIndicators = (
    current: CurrentData | undefined,
    daily: DailyData | undefined
): KeyIndicator[] => {
    const indicators: KeyIndicator[] = [];

    const getSafeNumericValue = (obj: any, prop: string): number | undefined => {
        return (obj && typeof obj[prop] === 'number') ? obj[prop] : undefined;
    };

    const tempActual = getSafeNumericValue(current, 'temperature_2m');
    if (tempActual !== undefined) {
        indicators.push({
            id: 'temp-actual',
            label: 'Temperatura Actual',
            value: `${tempActual.toFixed(0)}`,
            unit: '°C',
            change: current?.is_day === 1 ? 'Día' : 'Noche',
            icon: 'temperature',
            gradient: 'linear-gradient(135deg, #ff7043, #ff4d4d)',
        });
    }

    const humidity = getSafeNumericValue(current, 'relative_humidity_2m');
    if (humidity !== undefined) {
        indicators.push({
            id: 'humidity',
            label: 'Humedad Relativa',
            value: `${humidity.toFixed(0)}`,
            unit: '%',
            change: 'Normal',
            icon: 'humidity',
            gradient: 'linear-gradient(135deg, #29b6f6, #0288d1)',
        });
    }

    const pressure = getSafeNumericValue(current, 'pressure_msl');
    if (pressure !== undefined) {
        indicators.push({
            id: 'pressure',
            label: 'Presión Atmosférica',
            value: `${pressure.toFixed(0)}`,
            unit: 'hPa',
            change: 'Estable',
            icon: 'pressure',
            gradient: 'linear-gradient(135deg, #ab47bc, #7b1fa2)',
        });
    }

    const windSpeed = getSafeNumericValue(current, 'wind_speed_10m');
    if (windSpeed !== undefined) {
        indicators.push({
            id: 'wind-speed',
            label: 'Velocidad del Viento',
            value: `${windSpeed.toFixed(0)}`,
            unit: 'km/h',
            change: 'Moderado',
            icon: 'wind',
            gradient: 'linear-gradient(135deg, #66bb6a, #388e3c)',
        });
    }

    const dailyTempMax = daily?.temperature_2m_max?.[0];
    if (dailyTempMax !== undefined) {
        indicators.push({
            id: 'temp-max-daily',
            label: 'Temp. Máx. Hoy',
            value: `${dailyTempMax.toFixed(0)}`,
            unit: '°C',
            change: '',
            icon: 'temperature',
            gradient: 'linear-gradient(135deg, #fbc02d, #f9a825)',
        });
    }

    const dailyTempMin = daily?.temperature_2m_min?.[0];
    if (dailyTempMin !== undefined) {
        indicators.push({
            id: 'temp-min-daily',
            label: 'Temp. Mín. Hoy',
            value: `${dailyTempMin.toFixed(0)}`,
            unit: '°C',
            change: '',
            icon: 'temperature',
            gradient: 'linear-gradient(135deg, #42a5f5, #1976d2)',
        });
    }

    return indicators;
};