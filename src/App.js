import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./App.css";
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
    return Math.round((temp * 9) / 5 + 32); // Làm tròn số nguyên
  }
  return Math.round(temp);
};


function App() {
  const [city, setCity] = useState("Hanoi");
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [fiveDayForecast, setFiveDayForecast] = useState([]);
  const [uvIndex, setUvIndex] = useState(null);
  const [unit, setUnit] = useState("metric");

  useEffect(() => {
    fetchFiveDayForecast();
    fetchHourlyForecast();
    fetchCurrentWeather();
  }, [city, unit]);

  const fetchCurrentWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu thời tiết hiện tại:", error);
    }
  };

  // Fetch 5-day forecast
  const fetchFiveDayForecast = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
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


  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundImage: `url(${getBackgroundImage(
          weatherData?.weather?.[0]?.main?.toLowerCase()
        )})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
      }}>
        <div>
          <TemperatureUnitToggle unit={unit} toggleUnit={toggleUnit} />
        </div>

        <div style={{ display: "flex" }}>
          <SearchBar onSearch={setCity} />
        </div>
      </header>

      <div style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
      }}>
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
      </div>
      <div style={{
        width: "90%",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
      }}>
        <HourlyForecast forecast={hourlyForecast} unit={unit} />
      </div>

      <div className="forecast-info-container">
        <FiveDayForecast 
          forecast={fiveDayForecast} 
          unit={unit} 
          convertTemperature={convertTemperature}/>

        <AdditionalInfo 
          humidity={weatherData?.main?.humidity}
          pressure={weatherData?.main?.pressure}
          windSpeed={weatherData?.wind?.speed}
          cloudiness={weatherData?.clouds?.all}
          visibility={weatherData?.visibility}
          feelsLike={weatherData?.main?.feels_like}
          convertTemperature={convertTemperature}  // Truyền hàm xuống component
          unit={unit}
        />

      </div>
    </div>
  );
}

export default App;
