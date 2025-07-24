import React from 'react';
import type { HourlyData } from '../types/DashboardTypes'; 


interface HourlyForecastTableProps {
  hourlyData: HourlyData;
}

const HourlyForecastTable: React.FC<HourlyForecastTableProps> = ({ hourlyData }) => {
  const numHoursToShow = 8;
  const slicedDataTime = hourlyData.time.slice(0, numHoursToShow);
  const slicedDataTemp = hourlyData.temperature_2m.slice(0, numHoursToShow);
  // Asegúrate de que estos se accedan con encadenamiento opcional y se establezcan en arreglos vacíos por defecto
  const slicedDataHumidity = hourlyData.relative_humidity_2m?.slice(0, numHoursToShow) || [];
  const slicedDataPressure = hourlyData.pressure_msl?.slice(0, numHoursToShow) || [];
  const slicedDataWindSpeed = hourlyData.wind_speed_10m?.slice(0, numHoursToShow) || []; // Renombrado para claridad
  const slicedDataWindDirection = hourlyData.wind_direction_10m?.slice(0, numHoursToShow) || []; // Necesario
  const slicedDataRain = hourlyData.rain?.slice(0, numHoursToShow) || [];
  const slicedDataPrecipitationProb = hourlyData.precipitation_probability?.slice(0, numHoursToShow) || [];
  const slicedDataApparentTemp = hourlyData.apparent_temperature?.slice(0, numHoursToShow) || [];
  const slicedDataWeatherCode = hourlyData.weather_code.slice(0, numHoursToShow);


  const getWeatherDescriptionAndIcon = (code: number) => {
    switch (code) {
      case 0: return { description: 'Despejado', icon: '☀️' };
      case 1:
      case 2:
      case 3: return { description: 'Parcialmente nublado', icon: '🌤️' };
      case 45:
      case 48: return { description: 'Niebla', icon: '🌫️' };
      case 51:
      case 53:
      case 55: return { description: 'Llovizna', icon: '💧' };
      case 56:
      case 57: return { description: 'Llovizna helada', icon: '❄️💧' };
      case 61:
      case 63:
      case 65: return { description: 'Lluvia', icon: '🌧️' };
      case 66:
      case 67: return { description: 'Lluvia helada', icon: '🥶🌧️' };
      case 71:
      case 73:
      case 75: return { description: 'Nieve', icon: '🌨️' };
      case 77: return { description: 'Granizo', icon: '雹' };
      case 80:
      case 81:
      case 82: return { description: 'Chubascos', icon: '🌦️' };
      case 85:
      case 86: return { description: 'Nieve intensa', icon: '❄️' };
      case 95: return { description: 'Tormenta', icon: '⛈️' };
      case 96:
      case 99: return { description: 'Tormenta con granizo', icon: '🌩️' };
      default: return { description: 'Desconocido', icon: '❓' };
    }
  };

  const getWindDirection = (degree: number): string => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round((degree % 360) / 45);
    return directions[index % 8];
  };

  return (
    <div className="hourly-forecast-table-container">
      <h3>Pronóstico por Hora</h3>
      <table className="hourly-forecast-table">
        <thead>
          <tr>
            <th>Hora</th>
            <th>Temp. (°C)</th>
            <th>Humedad (%)</th>
            <th>Presión (hPa)</th>
            <th>Viento (km/h)</th>
            <th>Lluvia (mm)</th>
            <th>Prob. Prec. (%)</th>
            <th>Sensación T. (°C)</th>
            <th>Condición</th>
          </tr>
        </thead>
        <tbody>
          {slicedDataTime.map((time, index) => (
            <tr key={index}>
              <td>{new Date(time).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false })}</td>
              <td>{slicedDataTemp[index]?.toFixed(0) || 'N/A'}</td>
              <td>{slicedDataHumidity[index]?.toFixed(0) || 'N/A'}</td>
              <td>{slicedDataPressure[index]?.toFixed(0) || 'N/A'}</td>
              <td>
                {slicedDataWindSpeed[index]?.toFixed(0) || 'N/A'}{' '}
                {slicedDataWindDirection[index] !== undefined ? getWindDirection(slicedDataWindDirection[index]) : ''}
              </td>
              <td>{slicedDataRain[index]?.toFixed(1) || 'N/A'}</td>
              <td>{slicedDataPrecipitationProb[index]?.toFixed(0) || 'N/A'}</td>
              <td>{slicedDataApparentTemp[index]?.toFixed(0) || 'N/A'}</td>
              <td>
                <span className="weather-condition-badge">
                  {slicedDataWeatherCode[index] !== undefined ? getWeatherDescriptionAndIcon(slicedDataWeatherCode[index]).description : 'N/A'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HourlyForecastTable;