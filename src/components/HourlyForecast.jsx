import React from "react";
import './HourlyForecast.css';
const HourlyForecast = ({ forecast = [] }) => {
    if (!forecast || forecast.length === 0) {
        return <p>Loading forecast...</p>;
    }

    return (
        <div className="hourly-forecast-container">
            <div className="forecast-title">Hourly Forecast</div>
            <div className="hourly-forecast">
                {forecast.map((hour, index) => (
                    <div className="hour" key={index}>
                        <span>{hour.time}</span>
                        <span>{hour.temp}°C</span>
                    </div>
                ))}
            </div>
            <div className="arrow">➡</div>
        </div>
    );
};

export default HourlyForecast;
