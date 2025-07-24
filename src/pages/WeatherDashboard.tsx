import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import LocationSelector from '../components/LocationSelector';
import ConditionsSection from '../components/ConditionsSection';
import KeyIndicatorsSection from '../components/KeyIndicatorsSection';
import TemporalAnalysisSection from '../components/TemporalAnalysisSection'; // Importación por defecto

import { useDataFetcher } from '../functions/DataFetcher';

import type {
    Condition,
    KeyIndicator,
    Location,
    LocationName
} from '../types/DashboardTypes';

import { generateConditions } from '../functions/ConditionGenerator';
import { generateKeyIndicators } from '../functions/KeyIndicatorGenerator';

import '../index.css';
import '../App.css';

function WeatherDashboard() {
    // Ubicaciones configuradas para provincias de Ecuador
    const predefinedLocations: { [key in LocationName]: Location } = {
        "Pichincha": { latitude: -0.2252, longitude: -78.5249, timezone: "America/Guayaquil" }, // Quito
        "Guayas": { latitude: -2.1962, longitude: -79.8862, timezone: "America/Guayaquil" }, // Guayaquil
        "Azuay": { latitude: -2.9000, longitude: -79.0000, timezone: "America/Guayaquil" }, // Cuenca
        "Manabí": { latitude: -0.9500, longitude: -80.7333, timezone: "America/Guayaquil" }, // Portoviejo
        "El Oro": { latitude: -3.2500, longitude: -79.9667, timezone: "America/Guayaquil" }, // Machala
        "Loja": { latitude: -4.0000, longitude: -79.2000, timezone: "America/Guayaquil" }, // Loja
    };

    const [currentLocationName, setCurrentLocationName] = useState<LocationName>("Guayas");
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const { latitude, longitude, timezone } = predefinedLocations[currentLocationName];

    const { data: weatherData, loading, error } = useDataFetcher({ latitude, longitude, timezone, refreshTrigger });

    const [conditions, setConditions] = useState<Condition[]>([]);
    const [keyIndicators, setKeyIndicators] = useState<KeyIndicator[]>([]);

    useEffect(() => {
        if (weatherData && weatherData.current && weatherData.daily && weatherData.hourly) {
            // Llamada a generateConditions con los argumentos correctos
            setConditions(generateConditions(weatherData.current, currentLocationName));
            setKeyIndicators(generateKeyIndicators(weatherData.current, weatherData.daily));
        } else {
            setConditions([]);
            setKeyIndicators([]);
        }
    }, [weatherData, currentLocationName]);

    // Efecto para depurar el valor de weatherData.current.time
    useEffect(() => {
        if (weatherData?.current?.time) {
            console.log("[App.tsx] Valor de weatherData.current.time (original):", weatherData.current.time);
            const testDate = new Date(weatherData.current.time);
            console.log("[App.tsx] new Date(time) es válido:", !isNaN(testDate.getTime()));
        } else {
            console.log("[App.tsx] weatherData.current.time es undefined, null o vacío.");
        }
    }, [weatherData?.current?.time]);


    const handleLocationChange = (newLocationName: LocationName) => {
        if (Object.keys(predefinedLocations).includes(newLocationName)) {
            setCurrentLocationName(newLocationName as LocationName);
        } else {
            console.warn("Ubicación no encontrada en la lista predefinida:", newLocationName);
        }
    };

    const handleRefresh = useCallback(() => {
        setRefreshTrigger(prev => prev + 1);
    }, []);

    const lastUpdate = (weatherData?.current?.time && weatherData.current.time !== '' && !isNaN(new Date(weatherData.current.time).getTime()))
        ? new Date(weatherData.current.time).toLocaleString('es-ES', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        })
        : 'N/A';

    const formatTime = (isoString: string | undefined) => {
        if (isoString && isoString !== '' && !isNaN(new Date(isoString).getTime())) {
            return new Date(isoString).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        }
        return 'N/A';
    };

    const sunrise = formatTime(weatherData?.daily?.sunrise?.[0]);
    const sunset = formatTime(weatherData?.daily?.sunset?.[0]);

    // Efecto para depurar los valores formateados de sunrise y sunset
    useEffect(() => {
        console.log("[App.tsx] Sunrise formateado:", sunrise);
        console.log("[App.tsx] Sunset formateado:", sunset);
    }, [sunrise, sunset]);


    if (loading && !weatherData) {
        return <div className="loading-screen">Cargando datos del clima...</div>;
    }

    if (error) {
        return <div className="error-screen">Error al cargar los datos: {error}. Por favor, inténtalo de nuevo más tarde.</div>;
    }

    return (
        // Usamos React.Fragment explícitamente para asegurar que 'React' se lea y resolver TS6133
        <React.Fragment>
            <div className="dashboard-container">
                <Header
                    lastUpdate={lastUpdate}
                    sunrise={sunrise}
                    sunset={sunset}
                    isConnecting={loading}
                    hasError={!!error}
                    onRefresh={handleRefresh}
                />
                <div className="dashboard-content">
                    <Card className="analysis-subtitle-card">
                        <h2 className="analysis-subtitle">Análisis meteorológico en tiempo real</h2>
                    </Card>

                    <div className="dashboard-grid">
                        <div className="main-content">
                            <ConditionsSection conditions={conditions} />

                            <KeyIndicatorsSection indicators={keyIndicators} />

                            <TemporalAnalysisSection
                                hourlyData={weatherData?.hourly}
                                currentWeatherData={weatherData?.current}
                            />
                        </div>
                        <aside className="sidebar">
                            <LocationSelector
                                currentLocationName={currentLocationName}
                                onLocationChange={handleLocationChange}
                                availableLocations={predefinedLocations}
                                hourlyData={weatherData?.hourly}
                            />
                        </aside>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default WeatherDashboard;