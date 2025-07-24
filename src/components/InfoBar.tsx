import React from 'react';
import Card from './Card';
import Icon from './Icon';
import type { LocationName } from '../types/DashboardTypes';

interface InfoBarProps {
  location: LocationName;
  temperature: number;
  humidity: number;
  windSpeed: number;
}

const InfoBar: React.FC<InfoBarProps> = ({ location, temperature, humidity, windSpeed }) => {
  return (
    <Card className="info-bar-card">
      <div className="info-bar-content">
        <div className="info-item">
          <Icon name="location" />
          <span>{location}</span>
        </div>
        <div className="info-item">
          <Icon name="temperature" />
          <span>{temperature.toFixed(1)}°C</span>
        </div>
        <div className="info-item">
          <Icon name="humidity" />
          <span>{humidity.toFixed(0)}% Humedad</span>
        </div>
        <div className="info-item">
          <Icon name="wind" />
          <span>{windSpeed.toFixed(1)} km/h Viento</span>
        </div>
      </div>
    </Card>
  );
};

export default InfoBar;