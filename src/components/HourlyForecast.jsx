import React from "react";
import "./HourlyForecast.css";

const HourlyForecast = ({ forecast = [], unit }) => {
    if (!forecast || forecast.length === 0) {
        return <p>Loading forecast...</p>;
    }

    return (
        <div
        style={{
            background: "rgba(37, 150, 190, 0.2)", /* Hiệu ứng kính mờ nhẹ */
            backdropFilter: "blur(10px)",
            borderRadius: 12,
            padding: 5,
            width: 900,
            minHeight: 170,
            marginTop: 7,
            marginBottom: 1,
            overflowX: 'auto',
            display: 'flex',
            flexDirection: 'column',
            border: "0.5px solid rgba(255, 255, 255, 0.3)" /* Viền trắng mờ */
        }}>
            <div className="forecast-title">Hourly Forecast</div>
            <div className="hourly-forecast">
                {forecast.map((hour, index) => (
                    <div className="hour" key={index}>
                        <div className="hour-time">{hour.time}</div>
                        <img src={hour.icon} alt={hour.weather} />
                        <div className="hour-temp">
                            {hour.temp}{unit === "metric" ? "°C" : "°F"}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HourlyForecast;