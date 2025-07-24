// src/components/KeyIndicatorCard.tsx
import React from 'react';
import Card from './Card'; // Asegúrate de que Card esté importado
import Icon from './Icon'; // Asegúrate de que Icon esté importado
import type { KeyIndicator } from '../types/DashboardTypes'; // Importa la interfaz KeyIndicator

interface KeyIndicatorCardProps {
  indicator: KeyIndicator;
}

const KeyIndicatorCard: React.FC<KeyIndicatorCardProps> = ({ indicator }) => {
  return (
    <Card className="key-indicator-card" style={{ background: indicator.gradient }}>
      <div className="indicator-header">
        <span className="indicator-label-title">
          {indicator.label}
        </span>
        <Icon name={indicator.icon} /> {/* Icono */}
      </div>
      <div className="indicator-content-body">
        <div className="indicator-value-container">
          <span className="indicator-value">{indicator.value}</span>
          <span className="indicator-unit-badge">{indicator.unit}</span>
        </div>
        {indicator.change && (
          <span className="indicator-change">{indicator.change}</span>
        )}
      </div>
    </Card>
  );
};

export default KeyIndicatorCard;