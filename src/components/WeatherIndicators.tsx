
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Calendar } from "lucide-react";

interface WeatherIndicatorsProps {
  location: string;
}

const WeatherIndicators = ({ location }: WeatherIndicatorsProps) => {
  // Datos simulados basados en la ubicación
  const getWeatherData = (location: string) => {
    const data = {
      madrid: { temp: 28, humidity: 45, pressure: 1013, windSpeed: 12, uvIndex: 7 },
      barcelona: { temp: 25, humidity: 60, pressure: 1015, windSpeed: 8, uvIndex: 6 },
      sevilla: { temp: 32, humidity: 35, pressure: 1011, windSpeed: 15, uvIndex: 9 },
      valencia: { temp: 27, humidity: 55, pressure: 1014, windSpeed: 10, uvIndex: 7 },
      bilbao: { temp: 22, humidity: 70, pressure: 1016, windSpeed: 18, uvIndex: 4 }
    };
    return data[location as keyof typeof data] || data.madrid;
  };

  const weatherData = getWeatherData(location);

  const indicators = [
    {
      title: "Temperatura Actual",
      value: `${weatherData.temp}°C`,
      unit: "Celsius",
      color: "bg-gradient-to-r from-red-500 to-orange-500",
      textColor: "text-white",
      icon: <Thermometer className="h-6 w-6" />
    },
    {
      title: "Humedad Relativa",
      value: `${weatherData.humidity}%`,
      unit: "Porcentaje",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      textColor: "text-white",
      icon: <Calendar className="h-6 w-6" />
    },
    {
      title: "Presión Atmosférica",
      value: `${weatherData.pressure}`,
      unit: "hPa",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      textColor: "text-white",
      icon: <Calendar className="h-6 w-6" />
    },
    {
      title: "Velocidad del Viento",
      value: `${weatherData.windSpeed}`,
      unit: "km/h",
      color: "bg-gradient-to-r from-green-500 to-teal-500",
      textColor: "text-white",
      icon: <Calendar className="h-6 w-6" />
    },
    {
      title: "Índice UV",
      value: `${weatherData.uvIndex}`,
      unit: "Escala UV",
      color: "bg-gradient-to-r from-yellow-500 to-orange-500",
      textColor: "text-white",
      icon: <Calendar className="h-6 w-6" />
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {indicators.map((indicator, index) => (
        <Card key={index} className="border-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className={`${indicator.color} ${indicator.textColor} pb-2`}>
            <CardTitle className="flex items-center justify-between text-sm font-medium">
              <span>{indicator.title}</span>
              {indicator.icon}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-800">
                {indicator.value}
              </div>
              <Badge variant="secondary" className="text-xs">
                {indicator.unit}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WeatherIndicators;
