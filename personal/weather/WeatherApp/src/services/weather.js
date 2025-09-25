import axios from 'axios';

const API_KEY ='882f9695f93d42ddafb115434253006'; // my openweathermap API key
const BASE_URL = 'https://api.weatherapi.com/v1';

export const getWeatherByCity = async (city) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=5&hourly=1`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching weather by city:', error);
    throw error;
  }
};

export const getWeatherByCoords = async (lat, lon) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=5&hourly=1`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching weather by coordinates:', error);
    throw error;
  }
};