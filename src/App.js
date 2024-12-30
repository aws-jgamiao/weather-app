import React, { useState } from 'react';
import axios from 'axios';
import './WeatherApp.css'; // Import the CSS file

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    const API_KEY = '1a53915c365c4f0da5975858243012';
    const API_URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;

    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await axios.get(API_URL);
      setWeatherData(response.data);  // Store the entire response
    } catch (err) {
      setError('City not found or API error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Dynamic background based on weather condition
  const getBackgroundClass = (condition) => {
    switch (condition) {
      case 'Sunny':
        return 'sunny-bg';
      case 'Cloudy':
        return 'cloudy-bg';
      case 'Rain':
      case 'Showers':
        return 'rainy-bg';
      case 'Mist':
        return 'misty-bg';
      case 'Snow':
        return 'snowy-bg';
      default:
        return 'default-bg';
    }
  };

  return (
    <div className={`weather-container ${weatherData && getBackgroundClass(weatherData.current.condition.text)}`}>
      <div className="weather-card">
        <h1 className="title">Weather App</h1>

        <div className="input-container">
          <input
            type="text"
            className="city-input"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') fetchWeather(city);
            }}
          />
        </div>

        <div className="status">
          {loading && <p className="loading">Loading...</p>}
          {error && <p className="error">{error}</p>}
        </div>

        {weatherData && weatherData.current && (
          <div className="weather-info">
            <h2 className="location">{weatherData.location.name}, {weatherData.location.country}</h2>
            <div className="temperature">
              <p>Temperature: {weatherData.current.temp_c}°C ({weatherData.current.temp_f}°F)</p>
              <p>Condition: {weatherData.current.condition.text}</p>
            </div>
            <img
              src={`https:${weatherData.current.condition.icon}`}
              alt="Weather Icon"
              className="weather-icon"
            />

            {/* Additional Weather Details */}
            <div className="weather-details">
              <p>Feels Like: {weatherData.current.feelslike_c}°C ({weatherData.current.feelslike_f}°F)</p>
              <p>Wind: {weatherData.current.wind_mph} mph ({weatherData.current.wind_kph} kph) from the {weatherData.current.wind_dir}</p>
              <p>Humidity: {weatherData.current.humidity}%</p>
              <p>Visibility: {weatherData.current.vis_miles} miles</p>
              <p>Pressure: {weatherData.current.pressure_in} inHg</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
