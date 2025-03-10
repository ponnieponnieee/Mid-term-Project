import axios from "axios";

const API_KEY = "YOUa73b24f019489058f409224367509cd7";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchCurrentWeather = async (city) => {
    try {
        const response = await axios.get(`${BASE_URL}/weather`, {
            params: {
                q: city,
                appid: API_KEY,
                units: "metric", // Chuyển đổi sang độ C
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Lỗi không xác định");
    }
};

export const fetchForecast = async (city) => {
    try {
        const response = await axios.get(`${BASE_URL}/forecast`, {
            params: {
                q: city,
                appid: API_KEY,
                units: "metric",
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Lỗi không xác định");
    }
};
