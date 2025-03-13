import React from 'react';
import './TemperatureUnitToggle.css'; // Thêm CSS để định dạng nút

const TemperatureUnitToggle = ({ unit, toggleUnit }) => {
    return (
      <div className="unit-toggle" onClick={toggleUnit}>
        <span className={`unit ${unit === "metric" ? "active" : ""}`}>°C</span>
        <span className="separator">|</span>
        <span className={`unit ${unit === "imperial" ? "active" : ""}`}>°F</span>
      </div>
    );
};

export default TemperatureUnitToggle;