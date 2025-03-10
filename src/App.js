import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import FiveDayForecast from "./components/FiveDayForecast";
import AdditionalInfo from "./components/AdditionalInfo";

const API_KEY = "a73b24f019489058f409224367509cd7";

function App() {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState("Hanoi");  // Mặc định hiển thị Hà Nội

    useEffect(() => {
        fetchWeather(city);
    }, [city]);

    const fetchWeather = async (city) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            setWeather(response.data);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu thời tiết:", error);
        }
    };

    return (
        <div className="app">
            <SearchBar setCity={setCity} />
            {weather && (
                <>
                    <CurrentWeather weather={weather} />
                    <HourlyForecast weather={weather} />
                    <FiveDayForecast weather={weather} />
                    <AdditionalInfo weather={weather} />
                </>
            )}
        </div>
    );
}

export default App;
