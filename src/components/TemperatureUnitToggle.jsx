import React from 'react';
import './TemperatureUnitToggle.css';

const TemperatureUnitToggle = ({ unit, toggleUnit }) => {
    return (
      <div className="unit-toggle" onClick={toggleUnit}>
        <span className={`unit ${unit === "metric" ? "active" : ""}`}>°C</span>
        <span style={{
          color: 'rgba(255, 255, 255, 0.4)',
          margin: '0 5px',
          fontWeight: 300
        }}>|</span>
        <span className={`unit ${unit === "imperial" ? "active" : ""}`}>°F</span>
      </div>
    );
};

export default TemperatureUnitToggle;