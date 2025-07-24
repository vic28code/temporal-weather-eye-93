import React from 'react';
import Icon from './Icon';

interface HeaderProps {
  lastUpdate: string;
  sunrise: string;
  sunset: string;
  isConnecting: boolean;
  hasError: boolean;
  onRefresh: () => void;
}

const Header: React.FC<HeaderProps> = ({
  lastUpdate,
  sunrise,
  sunset,
  isConnecting,
  hasError,
  onRefresh,
}) => {
  const statusClass = isConnecting ? 'status-connecting' : (hasError ? 'status-error' : 'status-online');
  const statusText = isConnecting ? 'Conectando...' : (hasError ? 'Error' : 'En línea');

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h1 className="app-title">Dashboard Meteorológico</h1>
        <p className="app-subtitle">Tu análisis del clima en tiempo real</p>
      </div>
      <div className="header-right">
        <div className="info-group">
          <div className={`status-indicator ${statusClass}`}>
            <span className="status-dot"></span>
            <span>Estado: {statusText}</span>
          </div>
          <div className="last-update-info">
            <Icon name="update" />
            <span>Última actualización: {lastUpdate}</span>
          </div>
          <div className="sun-times-group">
            <div className="sun-time-item">
              <Icon name="sunrise" />
              <span>Amanecer: {sunrise}</span>
            </div>
            <div className="sun-time-item">
              <Icon name="sunset" />
              <span>Atardecer: {sunset}</span>
            </div>
          </div>
        </div>
        <div className="buttons-group">
          <button className="refresh-button" onClick={onRefresh} disabled={isConnecting}>
            <Icon name="refresh" />
            Actualizar
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;