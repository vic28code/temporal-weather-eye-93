// src/components/TemporalAnalysisSection.tsx
import React, { useMemo } from 'react';
import Card from './Card';
import type { HourlyData, CurrentData } from '../types/DashboardTypes';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TemporalAnalysisSectionProps {
  hourlyData: HourlyData | undefined;
  currentWeatherData: CurrentData | undefined;
}

const TemporalAnalysisSection: React.FC<TemporalAnalysisSectionProps> = ({ hourlyData }) => {
  const getHour = (dateTimeString: string): string => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const getWindDirection = (degree: number): string => {
    if (degree > 337.5 || degree <= 22.5) return 'N';
    if (degree > 22.5 && degree <= 67.5) return 'NE';
    if (degree > 67.5 && degree <= 112.5) return 'E';
    if (degree > 112.5 && degree <= 157.5) return 'SE';
    if (degree > 157.5 && degree <= 202.5) return 'S';
    if (degree > 202.5 && degree <= 247.5) return 'SO';
    if (degree > 247.5 && degree <= 292.5) return 'O';
    if (degree > 292.5 && degree <= 337.5) return 'NO';
    return '';
  };

  const chartData = useMemo(() => {
    if (!hourlyData || !hourlyData.time || hourlyData.time.length === 0) {
      return [];
    }

    const dataPoints = hourlyData.time.slice(0, 24).map((time, index) => {
      const temperature = hourlyData.temperature_2m?.[index];
      const rain = hourlyData.rain?.[index];
      const precipitationProbability = hourlyData.precipitation_probability?.[index];

      return {
        hour: getHour(time),
        Temperatura: temperature !== undefined ? parseFloat(temperature.toFixed(1)) : null,
        Lluvia: rain !== undefined ? parseFloat(rain.toFixed(1)) : null,
        'Prob. Precipitación': precipitationProbability !== undefined ? parseFloat(precipitationProbability.toFixed(0)) : null,
      };
    }).filter(item => item.Temperatura !== null);

    return dataPoints;
  }, [hourlyData]);

  return (
    <div className="temporal-analysis-section">
      <Card title="Pronóstico Horario y Análisis Temporal">
        <h3 className="chart-placeholder-title">Gráfico de Temperaturas y Precipitaciones Horarias</h3>
        <p className="chart-subtitle">Visualización de las próximas 24 horas.</p>
        <div className="chart-area-container">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="hour" stroke="#555" />
                <YAxis yAxisId="left" stroke="#ff7043" label={{ value: 'Temp (°C)', angle: -90, position: 'insideLeft', fill: '#ff7043' }} />
                <YAxis yAxisId="right" orientation="right" stroke="#29b6f6" label={{ value: 'Prob. Precipitación (%)', angle: 90, position: 'insideRight', fill: '#29b6f6' }} />
                <Tooltip
                  formatter={(value, name, _props) => [`${value}${name === 'Temperatura' ? '°C' : (name === 'Lluvia' ? ' mm' : '%')}`, name]}
                  labelFormatter={(label) => `Hora: ${label}`}
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '5px' }}
                  labelStyle={{ color: '#333' }}
                />
                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                <Line yAxisId="left" type="monotone" dataKey="Temperatura" stroke="#ff7043" activeDot={{ r: 8 }} name="Temperatura" />
                <Line yAxisId="right" type="monotone" dataKey="Prob. Precipitación" stroke="#29b6f6" activeDot={{ r: 8 }} name="Prob. Precipitación" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="chart-area-placeholder">
              <p>Cargando datos del gráfico o no hay datos disponibles.</p>
            </div>
          )}
        </div>

        <div className="hourly-forecast-table-container">
          <h3>Detalle Horario</h3>
          <div className="hourly-table-wrapper">
            {hourlyData && hourlyData.time && hourlyData.time.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Hora</th>
                    <th>Temperatura (°C)</th>
                    <th>Humedad (%)</th>
                    <th>Presión (hPa)</th>
                    <th>Viento (km/h)</th>
                    <th>Sensación Térmica (°C)</th>
                  </tr>
                </thead>
                <tbody>
                  {hourlyData.time.slice(0, 24).map((time, index) => (
                    <tr key={time}>
                      <td>{getHour(time)}</td>
                      <td>{hourlyData.temperature_2m?.[index]?.toFixed(0) || 'N/A'}</td>
                      <td>{hourlyData.relative_humidity_2m?.[index]?.toFixed(0) || 'N/A'}</td>
                      <td>{hourlyData.pressure_msl?.[index]?.toFixed(0) || 'N/A'}</td>
                      <td>
                        {hourlyData.wind_speed_10m?.[index]?.toFixed(0) || 'N/A'}{' '}
                        {hourlyData.wind_direction_10m?.[index] !== undefined
                          ? getWindDirection(hourlyData.wind_direction_10m[index])
                          : ''}
                      </td>
                      <td>{hourlyData.apparent_temperature?.[index]?.toFixed(0) || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-data-message">No hay datos de pronóstico horario disponibles.</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TemporalAnalysisSection;