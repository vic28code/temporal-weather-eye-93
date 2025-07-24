// src/components/TemperatureHumidityChart.tsx
import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from './Card';
import type { HourlyData } from '../types/DashboardTypes';

interface TemperatureHumidityChartProps {
  hourlyData: HourlyData | undefined;
}

const TemperatureHumidityChart: React.FC<TemperatureHumidityChartProps> = ({ hourlyData }) => {
  const getHour = (dateTimeString: string): string => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const chartData = useMemo(() => {
    if (!hourlyData || !hourlyData.time || hourlyData.time.length === 0) {
      return [];
    }

    const dataPoints = hourlyData.time.slice(0, 24).map((time, index) => {
      const temperature = hourlyData.temperature_2m?.[index];
      const humidity = hourlyData.relative_humidity_2m?.[index];

      return {
        hour: getHour(time),
        Temperatura: temperature !== undefined ? parseFloat(temperature.toFixed(1)) : null,
        Humedad: humidity !== undefined ? parseFloat(humidity.toFixed(0)) : null,
      };
    }).filter(item => item.Temperatura !== null && item.Humedad !== null);

    return dataPoints;
  }, [hourlyData]);

  return (
    <Card title="Gráfico de Temperatura y Humedad">
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="hour" stroke="#555" />
            <YAxis yAxisId="temp" stroke="#ff7043" label={{ value: 'Temp (°C)', angle: -90, position: 'insideLeft', fill: '#ff7043' }} />
            <YAxis yAxisId="hum" orientation="right" stroke="#29b6f6" label={{ value: 'Humedad (%)', angle: 90, position: 'insideRight', fill: '#29b6f6' }} />
            <Tooltip
              formatter={(value, name, _props) => [`${value}${name === 'Temperatura' ? '°C' : (name === 'Humedad' ? '%' : '')}`, name]}
              labelFormatter={(label) => `Hora: ${label}`}
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '5px' }}
              labelStyle={{ color: '#333' }}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            <Line yAxisId="temp" type="monotone" dataKey="Temperatura" stroke="#ff7043" activeDot={{ r: 6 }} name="Temperatura" />
            <Line yAxisId="hum" type="monotone" dataKey="Humedad" stroke="#29b6f6" activeDot={{ r: 6 }} name="Humedad Relativa" />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="chart-area-placeholder" style={{ height: '250px' }}>
          <p>Cargando datos del gráfico o no hay datos disponibles.</p>
        </div>
      )}
    </Card>
  );
};

export default TemperatureHumidityChart;