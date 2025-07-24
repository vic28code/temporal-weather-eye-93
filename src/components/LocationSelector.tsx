// src/components/LocationSelector.tsx
import React from 'react';
import Card from './Card';
import Icon from './Icon';
import TemperatureHumidityChart from './TemperatureHumidityChart';
import type { LocationSelectorProps, Location, LocationName, HourlyData } from '../types/DashboardTypes';

interface LocationSelectorExtendedProps extends LocationSelectorProps {
  hourlyData: HourlyData | undefined;
}

const LocationSelector: React.FC<LocationSelectorExtendedProps> = ({
  currentLocationName,
  onLocationChange,
  availableLocations,
  hourlyData,
}) => {
  const selectedLocationData: Location | undefined = availableLocations[currentLocationName];

  return (
    <>
      <Card title="Selector de Ubicación">
        <div className="location-info">
          <div className="location-item">
            <Icon name="location" />
            <span>{currentLocationName}</span>
          </div>
        </div>
        <div className="location-selector-dropdown">
          <Icon name="location" />
          <select value={currentLocationName} onChange={(e) => onLocationChange(e.target.value as LocationName)}>
            {Object.keys(availableLocations).map((locationName) => (
              <option key={locationName} value={locationName}>
                {locationName}
              </option>
            ))}
          </select>
        </div>
        {selectedLocationData && (
          <div className="coordinates-info">
            <p>Coordenadas: {selectedLocationData.latitude}, {selectedLocationData.longitude}</p>
            <p>Zona Horaria: {selectedLocationData.timezone}</p>
          </div>
        )}
      </Card>

      <TemperatureHumidityChart hourlyData={hourlyData} />
    </>
  );
};

export default LocationSelector;