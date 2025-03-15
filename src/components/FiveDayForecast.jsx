import React from "react";
import "./FiveDayForeCast.css";

const FiveDayForecast = ({ forecast = [], unit, convertTemperature }) => {
  if (!forecast || forecast.length === 0) {
    return <p>Loading forecast...</p>;
  }

  return (
    <div className="forecast-container" >
      <h3>5-DAYS FORECAST</h3>
      <div className="forecast-list">
        {forecast.map(([date, data], index) => (
          <div key={index} className="forecast-item">
            <span className="day">{date}</span> {/* Sửa day.day → date */}
            <img src={data.icon} alt={data.weather} className="weather-icon" />
            <span className="temp">
              {convertTemperature(data.temp, unit)}°{unit === "metric" ? "C" : "F"}
            </span>
            <span className="condition">{data.weather}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiveDayForecast;
