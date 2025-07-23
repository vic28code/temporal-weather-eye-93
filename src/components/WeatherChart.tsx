
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, Legend } from 'recharts';

interface WeatherChartProps {
  location: string;
}

const WeatherChart = ({ location }: WeatherChartProps) => {
  // Datos simulados para las últimas 24 horas
  const generateWeatherData = (location: string) => {
    const baseTemp = location === 'madrid' ? 25 : location === 'barcelona' ? 22 : location === 'sevilla' ? 30 : location === 'valencia' ? 24 : 20;
    const data = [];
    
    for (let i = 0; i < 24; i++) {
      const hour = i;
      const temp = baseTemp + Math.sin((i - 6) * Math.PI / 12) * 8 + Math.random() * 3;
      const humidity = 50 + Math.cos(i * Math.PI / 12) * 20 + Math.random() * 10;
      const windSpeed = 8 + Math.sin(i * Math.PI / 8) * 5 + Math.random() * 3;
      
      data.push({
        time: `${hour.toString().padStart(2, '0')}:00`,
        temperatura: Math.round(temp * 10) / 10,
        humedad: Math.round(humidity),
        viento: Math.round(windSpeed * 10) / 10
      });
    }
    
    return data;
  };

  const data = generateWeatherData(location);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{`Hora: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${entry.value}${entry.name === 'Temperatura' ? '°C' : entry.name === 'Humedad' ? '%' : ' km/h'}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="temperatureGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="humidityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
            <XAxis 
              dataKey="time" 
              stroke="#6b7280"
              fontSize={12}
              tick={{ fill: '#6b7280' }}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tick={{ fill: '#6b7280' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="temperatura"
              name="Temperatura"
              stroke="#ef4444"
              strokeWidth={3}
              fill="url(#temperatureGradient)"
            />
            <Line
              type="monotone"
              dataKey="humedad"
              name="Humedad"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="viento"
              name="Viento"
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#10b981', strokeWidth: 2, r: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <h4 className="font-semibold text-red-800 mb-2">🌡️ Temperatura</h4>
          <p className="text-sm text-red-700">
            Rango: {Math.min(...data.map(d => d.temperatura)).toFixed(1)}°C - {Math.max(...data.map(d => d.temperatura)).toFixed(1)}°C
          </p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">💧 Humedad</h4>
          <p className="text-sm text-blue-700">
            Promedio: {Math.round(data.reduce((acc, d) => acc + d.humedad, 0) / data.length)}%
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-800 mb-2">💨 Viento</h4>
          <p className="text-sm text-green-700">
            Máximo: {Math.max(...data.map(d => d.viento)).toFixed(1)} km/h
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherChart;
