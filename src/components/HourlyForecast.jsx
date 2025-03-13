import React from "react";
import './HourlyForecast.css';
const HourlyForecast = ({ forecast = [], unit}) => {
    if (!forecast || forecast.length === 0) {
        return <p>Loading forecast...</p>;
    }

    return (
        <div className="hourly-forecast-container">
            <div className="forecast-title">Hourly Forecast</div>
            <div className="hourly-forecast">
            {forecast.map((hour, index) => (
            <div className="hour" key={index}>
                <div className="hour-time">{hour.time}</div>
                <span>{hour.time}</span>
                <span>{hour.temp}{unit === "metric" ? "°C" : "°F"}</span> {/* Hiển thị đơn vị */}
                <div className="hour-temp">{hour.temp}{unit === "metric" ? "°C" : "°F"}</div>
            </div>
            ))}
            </div>
            <div className="arrow">➡</div>
        </div>
    );
};

export default HourlyForecast;
