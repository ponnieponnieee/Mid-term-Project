import React from "react";

const FiveDayForecast = () => {
    // dữ liệu thời tiết mẫu khi chưa có api
    const dummyForecast = [
        { day: "Today", min: 22, max: 27, condition: "Partly Cloudy", icon: "☁️" },
        { day: "Thu", min: 20, max: 25, condition: "Cloudy", icon: "🌥" },
        { day: "Fri", min: 23, max: 27, condition: "Mild Sunshine", icon: "🌤" },
        { day: "Sat", min: 23, max: 28, condition: "Mild Sunshine", icon: "🌤" },
        { day: "Sun", min: 20, max: 24, condition: "Downpour", icon: "🌧" },
        // { day: "Mon", min: 22, max: 27, condition: "Partly Cloudy", icon: "☁️" },
        // { day: "Tue", min: 24, max: 27, condition: "Partly Cloudy", icon: "☁️" },
  ];
    return(
        <div className="forecast-container">
            <h2>5-DAYS FORECAST</h2>
            <div className="forecast-list">
                {dummyForecast.map((day,index)=>(
                    <div key={index} className="forecast-item">
                        <span className="day">{day.day}</span>
                        <span className="weather-icon">{day.icon}</span>
                        <span className="temp">{day.tempLow}°C - {day.temHigh}°C</span>
                        <span className="condition">{day.condition}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FiveDayForecast;