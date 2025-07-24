import React from 'react';
import Icon from './Icon';
import type { Condition } from '../types/DashboardTypes';

interface ConditionCardProps {
  condition: Condition;
}

const ConditionCard: React.FC<ConditionCardProps> = ({ condition }) => {
  const getConditionIcon = (type: string) => {
    switch (type) {
      case 'Temperatura': return 'thermometer';
      case 'Humedad': return 'humidity';
      case 'Viento': return 'wind';
      case 'Visibilidad': return 'eye';
      case 'UV': return 'sun';
      case 'Aire': return 'air-quality';
      case 'Nieve': return 'snow';
      case 'Lluvia': return 'rain';
      default: return 'info';
    }
  };

  const levelClass = `level-${condition.level.toLowerCase()}`;

  return (
    <li className={`condition-card ${levelClass}`}>
      <div className="condition-header">
        <Icon name={getConditionIcon(condition.type)} />
        <span className="condition-type">{condition.type}</span>
        <span className={`condition-level ${levelClass}`}>{condition.level}</span>
        <span className="condition-time">{condition.time}</span>
      </div>
      <p className="condition-description">{condition.description}</p>
      <div className="condition-location">
        <Icon name="location-pin" /> {condition.location}
      </div>
    </li>
  );
};

export default ConditionCard;