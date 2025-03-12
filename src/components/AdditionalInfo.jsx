import React from "react";
import './AdditionalInfo.css';
const AdditionalInfo = () =>{
    // dữ liệu mặc định khi chưa gọi API
    const weatherData = {
        wind: "12km/h",
        visibility: "15 km",
        uvIndex:"03",
        humidity:"77%",
        feelsLike:"27°C",
        pressure:"1.008",
    };

    return (
        <div className="additional-info">
            <div className="info-box">
                <h3>WIND</h3>
                <p>{weatherData.wind}</p>
            </div>

            <div className="info-box">
                <h3>VISIBILITY</h3>
                <p>{weatherData.visibility}</p>
            </div>

            <div className="info-box uv-index">
                <h3>UV INDEX</h3>
                <p>{weatherData.uvIndex} <span className="moderate">moderate</span></p>
            </div>

            <div className="info-box">
                <h3>HUMIDITY</h3>
                <p>{weatherData.humidity}</p>
            </div>

            <div className="info-box">
                <h3>FEELS LIKE</h3>
                <p>{weatherData.feelsLike}</p>
            </div>

            <div className="info-box">
                <h3>⚖ PRESSURE</h3>
                <p>{weatherData.pressure}</p>
            </div>
        </div>
    );
};

export default AdditionalInfo;