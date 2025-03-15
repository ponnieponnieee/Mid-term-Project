import React, { useState, useEffect } from "react";
import './CurrentWeather.css';

const CurrentWeather = ({ city, temp, condition, high, low, unit, convertTemperature }) => {
  // Chuyển đổi các giá trị nhiệt độ theo đơn vị
  const convertedTemp = convertTemperature(temp, unit);
  const convertedHigh = convertTemperature(high, unit);
  const convertedLow = convertTemperature(low, unit);
  
  return (
    <div className={`current-temp-container`}>
      <h1>{city}</h1>
      <h2>{convertedTemp}°{unit === "metric" ? "C" : "F"}</h2>
      <p>{condition}</p>
      <p>H: {convertedHigh}°{unit === "metric" ? "C" : "F"} - L: {convertedLow}°{unit === "metric" ? "C" : "F"}</p>
    </div>
  );
};

export default CurrentWeather;