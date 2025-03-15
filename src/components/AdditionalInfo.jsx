import React from "react";
import "./AdditionalInfo.css";

const AdditionalInfo = ({ humidity, pressure, windSpeed, cloudiness, visibility, feelsLike, convertTemperature, unit}) => {
    return (
        <div className="additional-info">
            <div className="info-box">
                <h3>💨 <br/>
                    WIND</h3>
                <p>{windSpeed ? `${windSpeed} m/s` : "Loading..."}</p>
            </div>

            <div className="info-box">
                <h3> 👁️ VISIBILITY</h3>
                <p>{visibility ? `${visibility / 1000} km` : "Loading..."}</p>
            </div>

            <div className="info-box cloudiness">
                <h3> ☁️ CLOUDINESS</h3>
                <p>{cloudiness !== null ? `${cloudiness}%` : "Loading..."}</p>
            </div>

            <div className="info-box">
                <h3> 💧 HUMIDITY</h3>
                <p>{humidity ? `${humidity}%` : "Loading..."}</p>
            </div>

            <div className="info-box">
    <h3>🌡️ <br/> FEELS LIKE</h3>
    <p>
        {feelsLike !== null 
            ? `${convertTemperature(feelsLike, unit)}°${unit === "metric" ? "C" : "F"}`
            : "Loading..."}
    </p>
</div>


            <div className="info-box">
                <h3>⚖ PRESSURE</h3>
                <p>{pressure ? `${pressure} hPa` : "Loading..."}</p>
            </div>
        </div>
    );
};

export default AdditionalInfo;
