import React from 'react';
import Card from './Card'; 
import KeyIndicatorCard from './KeyIndicatorCard';
import type { KeyIndicator } from '../types/DashboardTypes';

interface KeyIndicatorsSectionProps {
  indicators: KeyIndicator[];
}

const KeyIndicatorsSection: React.FC<KeyIndicatorsSectionProps> = ({ indicators }) => {
  return (
    // ¡Envuelve toda la sección en un Card con su título aquí!
    // Esto asegura que el título "Indicadores Clave" y su borde se rendericen una sola vez.
    <Card title="Indicadores Clave" className="key-indicators-section-card"> {/* Añade una clase para posibles estilos de sección */}
      <div className="indicators-grid"> {/* Contiene la cuadrícula de las tarjetas */}
        {indicators.map((indicator) => (
          <KeyIndicatorCard key={indicator.id} indicator={indicator} />
        ))}
      </div>
    </Card>
  );
};

export default KeyIndicatorsSection;