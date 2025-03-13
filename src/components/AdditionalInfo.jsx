import React from "react";
import "./AdditionalInfo.css";

const AdditionalInfo = ({ humidity, pressure, windSpeed, uvIndex, visibility, feelsLike }) => {
    return (
        <div className="additional-info">
            <div className="info-box">
                <h3>WIND</h3>
                <p>{windSpeed ? `${windSpeed} m/s` : "Loading..."}</p>
            </div>

            <div className="info-box">
                <h3>VISIBILITY</h3>
                <p>{visibility ? `${visibility / 1000} km` : "Loading..."}</p>
            </div>

            <div className="info-box uv-index">
                <h3>UV INDEX</h3>
                <p>{uvIndex !== null ? uvIndex : "Loading..."} <span className="moderate">moderate</span></p>
            </div>

            <div className="info-box">
                <h3>HUMIDITY</h3>
                <p>{humidity ? `${humidity}%` : "Loading..."}</p>
            </div>

            <div className="info-box">
                <h3>FEELS LIKE</h3>
                <p>{feelsLike ? `${feelsLike}°C` : "Loading..."}</p>
            </div>

            <div className="info-box">
                <h3>⚖ PRESSURE</h3>
                <p>{pressure ? `${pressure} hPa` : "Loading..."}</p>
            </div>
        </div>
    );
};

export default AdditionalInfo;
