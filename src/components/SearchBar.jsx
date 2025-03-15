import React, { useState } from "react";
import axios from "axios";
import "./SearchBar.css";

const API_KEY = "882921e0d9be5ba87335b05a02cd362d";

const SearchBar = ({ onSearch }) => {
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState([]); // Lưu gợi ý

    // Gọi API gợi ý khi người dùng nhập
    const fetchCitySuggestions = async (query) => {
        if (query.length < 2) {
            setSuggestions([]); // Xóa gợi ý nếu nhập quá ngắn
            return;
        }
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
            );
            setSuggestions(response.data); // Lưu danh sách gợi ý
        } catch (error) {
            console.error("Lỗi khi lấy gợi ý thành phố:", error);
        }
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
        fetchCitySuggestions(e.target.value); // Gọi API khi nhập
    };

    const handleSelectSuggestion = (cityName) => {
        onSearch(cityName); // Chọn thành phố và gửi về App.js
        setInput(""); // Xóa input sau khi chọn
        setSuggestions([]); // Ẩn danh sách gợi ý
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search city..."
                value={input}
                onChange={handleInputChange}
                onKeyPress={(e) => e.key === "Enter" && handleSelectSuggestion(input)}
            />
            <button onClick={() => handleSelectSuggestion(input)}>🔍</button>

            {/* Hiển thị danh sách gợi ý */}
            {suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((city, index) => (
                        <li key={index} onClick={() => handleSelectSuggestion(city.name)}>
                            {city.name}, {city.country}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
