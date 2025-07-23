
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import WeatherChart from "@/components/WeatherChart";
import WeatherTable from "@/components/WeatherTable";
import WeatherIndicators from "@/components/WeatherIndicators";
import { AlertTriangle, MapPin, Thermometer } from "lucide-react";

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState("madrid");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const locations = [
    { value: "madrid", label: "Madrid, España" },
    { value: "barcelona", label: "Barcelona, España" },
    { value: "sevilla", label: "Sevilla, España" },
    { value: "valencia", label: "Valencia, España" },
    { value: "bilbao", label: "Bilbao, España" }
  ];

  const alerts = [
    {
      type: "warning",
      title: "Alerta de Temperatura Alta",
      description: "Se esperan temperaturas superiores a 35°C para mañana"
    },
    {
      type: "info",
      title: "Probabilidad de Lluvia",
      description: "60% de probabilidad de precipitaciones esta tarde"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Encabezado */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center gap-3">
            <Thermometer className="h-10 w-10 text-blue-600" />
            Dashboard Meteorológico
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Panel de control interactivo para el monitoreo y análisis de condiciones climáticas
            en tiempo real con datos estadísticos y proyecciones para la toma de decisiones informadas.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <span>Última actualización: {currentTime.toLocaleString('es-ES')}</span>
          </div>
        </div>

        {/* Alertas */}
        <div className="grid gap-4 md:grid-cols-2">
          {alerts.map((alert, index) => (
            <Alert key={index} className={`border-l-4 ${
              alert.type === 'warning' 
                ? 'border-l-orange-500 bg-orange-50' 
                : 'border-l-blue-500 bg-blue-50'
            }`}>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle className="font-semibold">{alert.title}</AlertTitle>
              <AlertDescription>{alert.description}</AlertDescription>
            </Alert>
          ))}
        </div>

        {/* Selector de Ubicación */}
        <Card className="border-2 border-blue-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-sky-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Seleccionar Ubicación
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-full max-w-xs">
                <SelectValue placeholder="Selecciona una ciudad" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location.value} value={location.value}>
                    {location.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="mt-4 flex items-center gap-2">
              <Badge variant="secondary">Zona horaria: CET (UTC+1)</Badge>
              <Badge variant="outline">Coordenadas: 40.4168° N, 3.7038° W</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Indicadores */}
        <WeatherIndicators location={selectedLocation} />

        {/* Gráfico */}
        <Card className="border-2 border-green-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <CardTitle>Evolución del Clima (Últimas 24 Horas)</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <WeatherChart location={selectedLocation} />
          </CardContent>
        </Card>

        {/* Tabla e Información Adicional */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="border-2 border-purple-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-violet-600 text-white">
                <CardTitle>Condiciones Detalladas</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <WeatherTable location={selectedLocation} />
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="border-2 border-indigo-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
                <CardTitle>Información Adicional</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-indigo-800 mb-2">💡 Consejos del Día</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Use protector solar si el índice UV es alto</li>
                    <li>• Manténgase hidratado en temperaturas elevadas</li>
                    <li>• Lleve paraguas si hay probabilidad de lluvia</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">🌱 Impacto Ambiental</h4>
                  <p className="text-sm text-gray-700">
                    La calidad del aire está en niveles buenos para actividades al aire libre.
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">⚡ Pronóstico Energético</h4>
                  <p className="text-sm text-gray-700">
                    Condiciones favorables para energía solar. Consumo de calefacción moderado.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
