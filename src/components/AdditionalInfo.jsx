import React from "react";
import "./AdditionalInfo.css";
import { FaWind } from "react-icons/fa";
import { MdVisibility } from "react-icons/md";
import { FaCloud } from "react-icons/fa";
import { RiWaterPercentFill } from "react-icons/ri";
import { FaTemperatureThreeQuarters } from "react-icons/fa6";
import { FaGauge } from "react-icons/fa6";



const AdditionalInfo = ({ humidity, pressure, windSpeed, cloudiness, visibility, feelsLike, convertTemperature, unit}) => {
    return (
        <div className="additional-info">
            <div className="info-box">
                <h3><FaWind /><br/> WIND</h3>
                <p>{windSpeed ? `${windSpeed} m/s` : "Loading..."}</p>
            </div>

            <div className="info-box">
                <h3><MdVisibility /><br/> VISIBILITY</h3>
                <p>{visibility ? `${visibility / 1000} km` : "Loading..."}</p>
            </div>

            <div className="info-box cloudiness">
                <h3><FaCloud /><br/> CLOUDINESS</h3>
                <p>{cloudiness !== null ? `${cloudiness}%` : "Loading..."}</p>
            </div>

            <div className="info-box">
                <h3><RiWaterPercentFill /> <br/>HUMIDITY</h3>
                <p>{humidity ? `${humidity}%` : "Loading..."}</p>
            </div>

            <div className="info-box">
                <h3><FaTemperatureThreeQuarters /><br/>FEELS LIKE</h3>
                <p>
                    {feelsLike !== null 
                    ? `${convertTemperature(feelsLike, unit)}°${unit === "metric" ? "C" : "F"}`
                    : "Loading..."}
    </p>
</div>


            <div className="info-box">
                <h3><FaGauge /> PRESSURE</h3>
                <p>{pressure ? `${pressure} hPa` : "Loading..."}</p>
            </div>
        </div>
    );
};

export default AdditionalInfo;
