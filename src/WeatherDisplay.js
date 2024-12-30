import React from 'react';

const WeatherDisplay = ({ weatherData }) => {
  const { name, main, weather } = weatherData;

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Weather in {name}</h2>
      <p>Temperature: {main.temp}°C</p>
      <p>Feels Like: {main.feels_like}°C</p>
      <p>Humidity: {main.humidity}%</p>
      <p>Condition: {weather[0].description}</p>
    </div>
  );
};

export default WeatherDisplay;