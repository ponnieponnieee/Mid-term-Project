import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import AdditionalInfo from "./components/AdditionalInfo";
import FiveDayForecast from "./components/FiveDayForecast";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import SearchBar from "./components/SearchBar";
import TemperatureUnitToggle from "./components/TemperatureUnitToggle";

import cloudy from "./weather-img/cloudy.jpg";
import night from "./weather-img/night.jpg";
import overcast from "./weather-img/overcast.jpg";
import rain from "./weather-img/rain.jpg";
import snow from "./weather-img/snow.jpg";
import sunny from "./weather-img/sunny.jpg";

const API_KEY = "3ce140d80007df9aa61c2345eb5fc341";

const getBackgroundImage = (weather) => {
  const images = {
    clouds: cloudy,
    night: night,
    overcast: overcast,
    rain: rain,
    snow: snow,
    clear: sunny,
  };
  return images[weather] || sunny;
};

// Hàm chuyển đổi nhiệt độ
const convertTemperature = (temp, unit) => {
  if (unit === "imperial") {
    return (temp * 9) / 5 + 32;
  }
  return temp;
};

function App() {
  const [city, setCity] = useState("Hanoi");
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [fiveDayForecast, setFiveDayForecast] = useState([]);
  const [uvIndex, setUvIndex] = useState(null);
  const [unit, setUnit] = useState("metric");

  // Fetch weather data
  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu thời tiết hiện tại:", error);
    }
  };

  // Fetch 5-day forecast
  const fetchFiveDayForecast = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${unit}`
      );

      const dailyForecast = {};
      response.data.list.forEach((entry) => {
        const date = new Date(entry.dt * 1000).toLocaleDateString("en-GB");
        if (!dailyForecast[date]) {
          dailyForecast[date] = {
            temp: entry.main.temp,
            weather: entry.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${entry.weather[0].icon}.png`,
          };
        }
      });

      setFiveDayForecast(Object.entries(dailyForecast).slice(0, 5));
    } catch (error) {
      console.error("Lỗi lấy dữ liệu dự báo 5 ngày:", error);
    }
  };

  // Fetch hourly forecast
  const fetchHourlyForecast = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${unit}`
      );

      setHourlyForecast(
        response.data.list.slice(0, 6).map((hour) => ({
          time: new Date(hour.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          temp: convertTemperature(hour.main.temp, unit),
          weather: hour.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`,
        }))
      );
    } catch (error) {
      console.error("Lỗi khi gọi API dự báo theo giờ:", error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
    fetchFiveDayForecast();
    fetchHourlyForecast();
  }, [city, unit]);

  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  const weatherCondition = weatherData?.weather?.[0]?.main?.toLowerCase() || "clear";

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${getBackgroundImage(weatherCondition)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <TemperatureUnitToggle unit={unit} toggleUnit={toggleUnit} />

      <SearchBar setCity={setCity} />
      {weatherData?.main && weatherData?.weather?.length > 0 && (
        <CurrentWeather
          city={weatherData.name}
          temp={weatherData.main.temp}
          condition={weatherData.weather[0].description}
          high={weatherData.main.temp_max}
          low={weatherData.main.temp_min}
          unit={unit}
          convertTemperature={convertTemperature}
        />
      )}
      <HourlyForecast forecast={hourlyForecast} unit={unit} />
      <div className="forecast-info-container">
        <FiveDayForecast forecast={fiveDayForecast} unit={unit} convertTemperature={convertTemperature} />

        <AdditionalInfo 
          humidity={weatherData?.main?.humidity}
          pressure={weatherData?.main?.pressure}
          windSpeed={weatherData?.wind?.speed}
          uvIndex={uvIndex}
          visibility={weatherData?.visibility}
          feelsLike={weatherData?.main?.feels_like}
        />
      </div>
    </div>
  );
}

export default App;
