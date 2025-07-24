// src/components/ConditionsSection.tsx
import React from 'react';
import Card from './Card';
import type { Condition } from '../types/DashboardTypes';

interface ConditionsSectionProps {
  conditions: Condition[];
}

const ConditionsSection: React.FC<ConditionsSectionProps> = ({ conditions }) => {
  return (
    <Card title="Condiciones Actuales">
      <div className="conditions-list">
        {conditions.length > 0 ? (
          conditions.map((condition) => (
            <div key={condition.id} className={`condition-item condition-level-${condition.level.toLowerCase()}`}>
              <div className="condition-header">
                <span className="condition-type">{condition.type}</span>
                <span className={`condition-level-badge condition-level-${condition.level.toLowerCase()}`}>
                  {condition.level}
                </span>
              </div>
              <p className="condition-description">{condition.description}</p>
              <div className="condition-meta">
                <span className="condition-time">{condition.time}</span>
                <span className="condition-location">{condition.location}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-data-message">No hay condiciones especiales reportadas en este momento.</p>
        )}
      </div>
    </Card>
  );
};

export default ConditionsSection;