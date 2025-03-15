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

const API_KEY = "882921e0d9be5ba87335b05a02cd362d";

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
    // Chuyển từ Celsius sang Fahrenheit
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

  useEffect(() => {
    fetchWeatherData();
  }, [city, unit]);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      
      const { lat, lon } = response.data.coord;
      fetchOneCallData(lat, lon);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu thời tiết:", error);
    }
  };

  const fetchOneCallData = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,daily&appid=${API_KEY}&units=metric`
      );
      
      setHourlyForecast(
        response.data.hourly.slice(0, 6).map((hour) => ({
          time: new Date(hour.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          temp: convertTemperature(hour.temp, unit),
          weather: hour.weather[0].description,
        }))
      );

    
      
      setUvIndex(response.data.current.uvi);
    } catch (error) {
      console.error("Lỗi khi gọi API One Call:", error);
    }
  };

  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric"); // Chuyển đổi giữa °C và °F
  };

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${getBackgroundImage(
          weatherData?.weather[0].main.toLowerCase()
        )})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <TemperatureUnitToggle unit={unit} toggleUnit={toggleUnit} />

      <SearchBar setCity={setCity} />
      {weatherData && (
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
        <FiveDayForecast forecast={fiveDayForecast}
        
        />
        <AdditionalInfo 
          humidity={weatherData?.main.humidity}
          pressure={weatherData?.main.pressure}
          windSpeed={weatherData?.wind.speed}
          uvIndex={weatherData?.uvIndex}
          visibility={weatherData?.visibility}
          feelsLike={weatherData?.feelsLike}
        />
      </div>
    </div>
  );
}
export default App;