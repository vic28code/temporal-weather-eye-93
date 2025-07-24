import React from 'react';
import Card from './Card';
import Icon from './Icon';

interface AlertCardProps {
  type: 'warning' | 'danger' | 'info' | 'success';
  title: string;
  message: string;
  onClose: () => void;
}

const AlertCard: React.FC<AlertCardProps> = ({ type, title, message, onClose }) => {
  const alertClass = `alert-card alert-type-${type}`;

  return (
    <Card className={alertClass}>
      <div className="alert-header">
        <h3>{title}</h3>
        <button className="alert-close-button" onClick={onClose}>
          <Icon name="close" />
        </button>
      </div>
      <p>{message}</p>
    </Card>
  );
};

export default AlertCard;