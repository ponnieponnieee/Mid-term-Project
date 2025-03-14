import React from "react";
import "./FiveDayForeCast.css";

const FiveDayForecast = ({ forecast = [] }) => {
  if (!forecast || forecast.length === 0) {
    return <p>Loading forecast...</p>;
  }

  return (
    <div className="forecast-container">
      <h2>5-DAYS FORECAST</h2>
      <div className="forecast-list">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-item">
            <span className="day">{day.day}</span>
            <img src={day.icon} alt={day.condition} className="weather-icon" />
            <span className="temp">{convertTemperature(day.min, unit)}°C - {convertTemperature(day.max, unit)}°C</span>
            <span className="condition">{day.condition}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiveDayForecast;
