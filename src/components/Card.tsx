// src/components/Card.tsx
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string; // Propiedad opcional para el título de la tarjeta
  style?: React.CSSProperties; // ¡NUEVO! Añadida la propiedad 'style'
}

const Card: React.FC<CardProps> = ({ children, className, title, style }) => {
  const cardClasses = `card ${className || ''}`;
  return (
    <div className={cardClasses} style={style}> {/* Pasa la prop style al div */}
      {title && <h2 className="card-title">{title}</h2>}
      {children}
    </div>
  );
};

export default Card;