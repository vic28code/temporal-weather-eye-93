
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface WeatherTableProps {
  location: string;
}

const WeatherTable = ({ location }: WeatherTableProps) => {
  const generateDetailedData = (location: string) => {
    const days = ['Hoy', 'Mañana', 'Jueves', 'Viernes', 'Sábado', 'Domingo', 'Lunes'];
    const conditions = ['Soleado', 'Parcialmente nublado', 'Nublado', 'Lluvia ligera', 'Lluvia', 'Tormenta'];
    
    return days.map((day, index) => {
      const baseTemp = location === 'madrid' ? 28 : location === 'barcelona' ? 25 : location === 'sevilla' ? 32 : location === 'valencia' ? 27 : 22;
      const tempVariation = Math.random() * 6 - 3;
      const maxTemp = Math.round(baseTemp + tempVariation);
      const minTemp = Math.round(maxTemp - 5 - Math.random() * 5);
      const condition = conditions[Math.floor(Math.random() * conditions.length)];
      const precipitation = Math.random() > 0.7 ? Math.round(Math.random() * 15) : 0;
      const windSpeed = Math.round(8 + Math.random() * 12);
      const windDirection = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)];
      
      return {
        day,
        condition,
        maxTemp,
        minTemp,
        precipitation,
        windSpeed,
        windDirection,
        humidity: Math.round(40 + Math.random() * 40),
        uvIndex: Math.round(1 + Math.random() * 10)
      };
    });
  };

  const weatherData = generateDetailedData(location);

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Soleado': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Parcialmente nublado': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Nublado': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'Lluvia ligera': return 'bg-cyan-100 text-cyan-800 border-cyan-300';
      case 'Lluvia': return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      case 'Tormenta': return 'bg-purple-100 text-purple-800 border-purple-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getUVColor = (uvIndex: number) => {
    if (uvIndex <= 2) return 'bg-green-100 text-green-800';
    if (uvIndex <= 5) return 'bg-yellow-100 text-yellow-800';
    if (uvIndex <= 7) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <TableHead className="font-semibold">Día</TableHead>
              <TableHead className="font-semibold">Condición</TableHead>
              <TableHead className="font-semibold">Temp. Máx/Mín</TableHead>
              <TableHead className="font-semibold">Precipitación</TableHead>
              <TableHead className="font-semibold">Viento</TableHead>
              <TableHead className="font-semibold">Humedad</TableHead>
              <TableHead className="font-semibold">Índice UV</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {weatherData.map((data, index) => (
              <TableRow key={index} className="hover:bg-gray-50 transition-colors">
                <TableCell className="font-medium">
                  {data.day}
                  {index === 0 && <Badge variant="outline" className="ml-2 text-xs">Actual</Badge>}
                </TableCell>
                <TableCell>
                  <Badge className={getConditionColor(data.condition)}>
                    {data.condition}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-red-600">{data.maxTemp}°</span>
                    <span className="text-gray-400">/</span>
                    <span className="text-blue-600">{data.minTemp}°</span>
                  </div>
                </TableCell>
                <TableCell>
                  {data.precipitation > 0 ? (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {data.precipitation}mm
                    </Badge>
                  ) : (
                    <span className="text-gray-400">0mm</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <span className="font-medium">{data.windSpeed} km/h</span>
                    <br />
                    <span className="text-gray-500">{data.windDirection}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{data.humidity}%</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getUVColor(data.uvIndex)}>
                    {data.uvIndex}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border">
          <h4 className="font-semibold text-blue-800 mb-2">📊 Resumen Semanal</h4>
          <p className="text-sm text-blue-700">
            Temp. promedio: {Math.round(weatherData.reduce((acc, d) => acc + (d.maxTemp + d.minTemp) / 2, 0) / weatherData.length)}°C
          </p>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border">
          <h4 className="font-semibold text-green-800 mb-2">🌧️ Precipitaciones</h4>
          <p className="text-sm text-green-700">
            Total: {weatherData.reduce((acc, d) => acc + d.precipitation, 0)}mm
          </p>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-lg border">
          <h4 className="font-semibold text-purple-800 mb-2">💨 Viento</h4>
          <p className="text-sm text-purple-700">
            Promedio: {Math.round(weatherData.reduce((acc, d) => acc + d.windSpeed, 0) / weatherData.length)} km/h
          </p>
        </div>
        <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border">
          <h4 className="font-semibold text-orange-800 mb-2">☀️ UV Máximo</h4>
          <p className="text-sm text-orange-700">
            Índice: {Math.max(...weatherData.map(d => d.uvIndex))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherTable;
