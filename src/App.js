import React, { useState, useEffect } from 'react';
import './WeatherApp.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showForecast, setShowForecast] = useState(false);
  const [temperatureUnit, setTemperatureUnit] = useState('C');
  const [showKuyaKim, setShowKuyaKim] = useState(false);
  const [weatherAlerts, setWeatherAlerts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Comprehensive world cities database
  const worldCities = [
    // Major World Cities
    { name: 'New York', country: 'United States', continent: 'North America', timezone: 'America/New_York' },
    { name: 'Los Angeles', country: 'United States', continent: 'North America', timezone: 'America/Los_Angeles' },
    { name: 'Chicago', country: 'United States', continent: 'North America', timezone: 'America/Chicago' },
    { name: 'Houston', country: 'United States', continent: 'North America', timezone: 'America/Chicago' },
    { name: 'Miami', country: 'United States', continent: 'North America', timezone: 'America/New_York' },
    { name: 'San Francisco', country: 'United States', continent: 'North America', timezone: 'America/Los_Angeles' },
    { name: 'Seattle', country: 'United States', continent: 'North America', timezone: 'America/Los_Angeles' },
    { name: 'Boston', country: 'United States', continent: 'North America', timezone: 'America/New_York' },
    { name: 'Las Vegas', country: 'United States', continent: 'North America', timezone: 'America/Los_Angeles' },
    { name: 'Washington DC', country: 'United States', continent: 'North America', timezone: 'America/New_York' },

    // Canada
    { name: 'Toronto', country: 'Canada', continent: 'North America', timezone: 'America/Toronto' },
    { name: 'Vancouver', country: 'Canada', continent: 'North America', timezone: 'America/Vancouver' },
    { name: 'Montreal', country: 'Canada', continent: 'North America', timezone: 'America/Montreal' },
    { name: 'Calgary', country: 'Canada', continent: 'North America', timezone: 'America/Edmonton' },
    { name: 'Ottawa', country: 'Canada', continent: 'North America', timezone: 'America/Toronto' },

    // Europe
    { name: 'London', country: 'United Kingdom', continent: 'Europe', timezone: 'Europe/London' },
    { name: 'Paris', country: 'France', continent: 'Europe', timezone: 'Europe/Paris' },
    { name: 'Berlin', country: 'Germany', continent: 'Europe', timezone: 'Europe/Berlin' },
    { name: 'Rome', country: 'Italy', continent: 'Europe', timezone: 'Europe/Rome' },
    { name: 'Madrid', country: 'Spain', continent: 'Europe', timezone: 'Europe/Madrid' },
    { name: 'Amsterdam', country: 'Netherlands', continent: 'Europe', timezone: 'Europe/Amsterdam' },
    { name: 'Vienna', country: 'Austria', continent: 'Europe', timezone: 'Europe/Vienna' },
    { name: 'Zurich', country: 'Switzerland', continent: 'Europe', timezone: 'Europe/Zurich' },
    { name: 'Stockholm', country: 'Sweden', continent: 'Europe', timezone: 'Europe/Stockholm' },
    { name: 'Copenhagen', country: 'Denmark', continent: 'Europe', timezone: 'Europe/Copenhagen' },
    { name: 'Oslo', country: 'Norway', continent: 'Europe', timezone: 'Europe/Oslo' },
    { name: 'Helsinki', country: 'Finland', continent: 'Europe', timezone: 'Europe/Helsinki' },
    { name: 'Warsaw', country: 'Poland', continent: 'Europe', timezone: 'Europe/Warsaw' },
    { name: 'Prague', country: 'Czech Republic', continent: 'Europe', timezone: 'Europe/Prague' },
    { name: 'Budapest', country: 'Hungary', continent: 'Europe', timezone: 'Europe/Budapest' },
    { name: 'Brussels', country: 'Belgium', continent: 'Europe', timezone: 'Europe/Brussels' },
    { name: 'Dublin', country: 'Ireland', continent: 'Europe', timezone: 'Europe/Dublin' },
    { name: 'Lisbon', country: 'Portugal', continent: 'Europe', timezone: 'Europe/Lisbon' },
    { name: 'Athens', country: 'Greece', continent: 'Europe', timezone: 'Europe/Athens' },
    { name: 'Moscow', country: 'Russia', continent: 'Europe', timezone: 'Europe/Moscow' },
    { name: 'Istanbul', country: 'Turkey', continent: 'Europe', timezone: 'Europe/Istanbul' },

    // Asia
    { name: 'Tokyo', country: 'Japan', continent: 'Asia', timezone: 'Asia/Tokyo' },
    { name: 'Seoul', country: 'South Korea', continent: 'Asia', timezone: 'Asia/Seoul' },
    { name: 'Beijing', country: 'China', continent: 'Asia', timezone: 'Asia/Shanghai' },
    { name: 'Shanghai', country: 'China', continent: 'Asia', timezone: 'Asia/Shanghai' },
    { name: 'Hong Kong', country: 'Hong Kong', continent: 'Asia', timezone: 'Asia/Hong_Kong' },
    { name: 'Singapore', country: 'Singapore', continent: 'Asia', timezone: 'Asia/Singapore' },
    { name: 'Bangkok', country: 'Thailand', continent: 'Asia', timezone: 'Asia/Bangkok' },
    { name: 'Kuala Lumpur', country: 'Malaysia', continent: 'Asia', timezone: 'Asia/Kuala_Lumpur' },
    { name: 'Jakarta', country: 'Indonesia', continent: 'Asia', timezone: 'Asia/Jakarta' },
    { name: 'Mumbai', country: 'India', continent: 'Asia', timezone: 'Asia/Kolkata' },
    { name: 'New Delhi', country: 'India', continent: 'Asia', timezone: 'Asia/Kolkata' },
    { name: 'Bangalore', country: 'India', continent: 'Asia', timezone: 'Asia/Kolkata' },
    { name: 'Chennai', country: 'India', continent: 'Asia', timezone: 'Asia/Kolkata' },
    { name: 'Kolkata', country: 'India', continent: 'Asia', timezone: 'Asia/Kolkata' },
    { name: 'Hyderabad', country: 'India', continent: 'Asia', timezone: 'Asia/Kolkata' },
    { name: 'Dubai', country: 'United Arab Emirates', continent: 'Asia', timezone: 'Asia/Dubai' },
    { name: 'Doha', country: 'Qatar', continent: 'Asia', timezone: 'Asia/Qatar' },
    { name: 'Riyadh', country: 'Saudi Arabia', continent: 'Asia', timezone: 'Asia/Riyadh' },
    { name: 'Tel Aviv', country: 'Israel', continent: 'Asia', timezone: 'Asia/Jerusalem' },
    { name: 'Tehran', country: 'Iran', continent: 'Asia', timezone: 'Asia/Tehran' },
    { name: 'Karachi', country: 'Pakistan', continent: 'Asia', timezone: 'Asia/Karachi' },
    { name: 'Lahore', country: 'Pakistan', continent: 'Asia', timezone: 'Asia/Karachi' },
    { name: 'Dhaka', country: 'Bangladesh', continent: 'Asia', timezone: 'Asia/Dhaka' },
    { name: 'Colombo', country: 'Sri Lanka', continent: 'Asia', timezone: 'Asia/Colombo' },
    { name: 'Kathmandu', country: 'Nepal', continent: 'Asia', timezone: 'Asia/Kathmandu' },
    { name: 'Yangon', country: 'Myanmar', continent: 'Asia', timezone: 'Asia/Yangon' },
    { name: 'Hanoi', country: 'Vietnam', continent: 'Asia', timezone: 'Asia/Ho_Chi_Minh' },
    { name: 'Ho Chi Minh City', country: 'Vietnam', continent: 'Asia', timezone: 'Asia/Ho_Chi_Minh' },
    { name: 'Phnom Penh', country: 'Cambodia', continent: 'Asia', timezone: 'Asia/Phnom_Penh' },
    { name: 'Vientiane', country: 'Laos', continent: 'Asia', timezone: 'Asia/Vientiane' },

    // Philippines
    { name: 'Manila', country: 'Philippines', continent: 'Asia', timezone: 'Asia/Manila' },
    { name: 'Quezon City', country: 'Philippines', continent: 'Asia', timezone: 'Asia/Manila' },
    { name: 'Cebu City', country: 'Philippines', continent: 'Asia', timezone: 'Asia/Manila' },
    { name: 'Davao City', country: 'Philippines', continent: 'Asia', timezone: 'Asia/Manila' },
    { name: 'Makati', country: 'Philippines', continent: 'Asia', timezone: 'Asia/Manila' },
    { name: 'Pasig', country: 'Philippines', continent: 'Asia', timezone: 'Asia/Manila' },
    { name: 'Taguig', country: 'Philippines', continent: 'Asia', timezone: 'Asia/Manila' },
    { name: 'Antipolo', country: 'Philippines', continent: 'Asia', timezone: 'Asia/Manila' },
    { name: 'Pasay', country: 'Philippines', continent: 'Asia', timezone: 'Asia/Manila' },
    { name: 'Cagayan de Oro', country: 'Philippines', continent: 'Asia', timezone: 'Asia/Manila' },
    { name: 'Parañaque', country: 'Philippines', continent: 'Asia', timezone: 'Asia/Manila' },
    { name: 'Valenzuela', country: 'Philippines', continent: 'Asia', timezone: 'Asia/Manila' },
    { name: 'Bacoor', country: 'Philippines', continent: 'Asia', timezone: 'Asia/Manila' },
    { name: 'General Santos', country: 'Philippines', continent: 'Asia', timezone: 'Asia/Manila' },
    { name: 'Las Piñas', country: 'Philippines', continent: 'Asia', timezone: 'Asia/Manila' },
    { name: 'Makati City', country: 'Philippines', continent: 'Asia', timezone: 'Asia/Manila' },
    { name: 'Muntinlupa', country: 'Philippines', continent: 'Asia', timezone: 'Asia/Manila' },
    { name: 'Zamboanga City', country: 'Philippines', continent: 'Asia', timezone: 'Asia/Manila' },
    { name: 'Iloilo City', country: 'Philippines', continent: 'Asia', timezone: 'Asia/Manila' },
    { name: 'Bacolod', country: 'Philippines', continent: 'Asia', timezone: 'Asia/Manila' },

    // Australia & Oceania
    { name: 'Sydney', country: 'Australia', continent: 'Oceania', timezone: 'Australia/Sydney' },
    { name: 'Melbourne', country: 'Australia', continent: 'Oceania', timezone: 'Australia/Melbourne' },
    { name: 'Brisbane', country: 'Australia', continent: 'Oceania', timezone: 'Australia/Brisbane' },
    { name: 'Perth', country: 'Australia', continent: 'Oceania', timezone: 'Australia/Perth' },
    { name: 'Adelaide', country: 'Australia', continent: 'Oceania', timezone: 'Australia/Adelaide' },
    { name: 'Auckland', country: 'New Zealand', continent: 'Oceania', timezone: 'Pacific/Auckland' },
    { name: 'Wellington', country: 'New Zealand', continent: 'Oceania', timezone: 'Pacific/Auckland' },
    { name: 'Christchurch', country: 'New Zealand', continent: 'Oceania', timezone: 'Pacific/Auckland' },

    // Africa
    { name: 'Cairo', country: 'Egypt', continent: 'Africa', timezone: 'Africa/Cairo' },
    { name: 'Lagos', country: 'Nigeria', continent: 'Africa', timezone: 'Africa/Lagos' },
    { name: 'Johannesburg', country: 'South Africa', continent: 'Africa', timezone: 'Africa/Johannesburg' },
    { name: 'Cape Town', country: 'South Africa', continent: 'Africa', timezone: 'Africa/Johannesburg' },
    { name: 'Nairobi', country: 'Kenya', continent: 'Africa', timezone: 'Africa/Nairobi' },
    { name: 'Casablanca', country: 'Morocco', continent: 'Africa', timezone: 'Africa/Casablanca' },
    { name: 'Tunis', country: 'Tunisia', continent: 'Africa', timezone: 'Africa/Tunis' },
    { name: 'Algiers', country: 'Algeria', continent: 'Africa', timezone: 'Africa/Algiers' },
    { name: 'Accra', country: 'Ghana', continent: 'Africa', timezone: 'Africa/Accra' },
    { name: 'Addis Ababa', country: 'Ethiopia', continent: 'Africa', timezone: 'Africa/Addis_Ababa' },

    // South America
    { name: 'São Paulo', country: 'Brazil', continent: 'South America', timezone: 'America/Sao_Paulo' },
    { name: 'Rio de Janeiro', country: 'Brazil', continent: 'South America', timezone: 'America/Sao_Paulo' },
    { name: 'Buenos Aires', country: 'Argentina', continent: 'South America', timezone: 'America/Argentina/Buenos_Aires' },
    { name: 'Lima', country: 'Peru', continent: 'South America', timezone: 'America/Lima' },
    { name: 'Bogotá', country: 'Colombia', continent: 'South America', timezone: 'America/Bogota' },
    { name: 'Santiago', country: 'Chile', continent: 'South America', timezone: 'America/Santiago' },
    { name: 'Caracas', country: 'Venezuela', continent: 'South America', timezone: 'America/Caracas' },
    { name: 'Quito', country: 'Ecuador', continent: 'South America', timezone: 'America/Guayaquil' },
    { name: 'La Paz', country: 'Bolivia', continent: 'South America', timezone: 'America/La_Paz' },
    { name: 'Montevideo', country: 'Uruguay', continent: 'South America', timezone: 'America/Montevideo' },

    // Mexico & Central America
    { name: 'Mexico City', country: 'Mexico', continent: 'North America', timezone: 'America/Mexico_City' },
    { name: 'Guadalajara', country: 'Mexico', continent: 'North America', timezone: 'America/Mexico_City' },
    { name: 'Monterrey', country: 'Mexico', continent: 'North America', timezone: 'America/Monterrey' },
    { name: 'Tijuana', country: 'Mexico', continent: 'North America', timezone: 'America/Tijuana' },
    { name: 'Guatemala City', country: 'Guatemala', continent: 'North America', timezone: 'America/Guatemala' },
    { name: 'San José', country: 'Costa Rica', continent: 'North America', timezone: 'America/Costa_Rica' },
    { name: 'Panama City', country: 'Panama', continent: 'North America', timezone: 'America/Panama' }
  ];

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('weatherSearchHistory');
    const savedFavorites = localStorage.getItem('weatherFavorites');
    const lastSearch = localStorage.getItem('lastWeatherSearch');
    const savedDarkMode = localStorage.getItem('weatherDarkMode');
    const savedUnit = localStorage.getItem('weatherTempUnit');

    if (savedHistory) setSearchHistory(JSON.parse(savedHistory));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (lastSearch) setWeatherData(JSON.parse(lastSearch));
    if (savedDarkMode) setIsDarkMode(JSON.parse(savedDarkMode));
    if (savedUnit) setTemperatureUnit(savedUnit);
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-wrapper')) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Find city in database
  const findCityData = (searchTerm) => {
    const normalizedSearch = searchTerm.toLowerCase().trim();
    return worldCities.find(city =>
      city.name.toLowerCase() === normalizedSearch ||
      city.name.toLowerCase().includes(normalizedSearch)
    );
  };

  // Generate realistic weather based on location and season
  const generateRealisticWeatherData = (cityData) => {
    const conditions = ['Sunny', 'Cloudy', 'Partly Cloudy', 'Rain', 'Snow', 'Mist', 'Thunderstorm', 'Overcast'];

    // Get seasonal and regional weather patterns
    const { temp, likelyConditions } = getRegionalWeatherPattern(cityData);
    const randomCondition = likelyConditions[Math.floor(Math.random() * likelyConditions.length)];

    // Generate 5-day forecast
    const forecast = [];
    for (let i = 1; i <= 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const forecastCondition = likelyConditions[Math.floor(Math.random() * likelyConditions.length)];
      forecast.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        condition: forecastCondition,
        high: temp + Math.floor(Math.random() * 8) - 2,
        low: temp - Math.floor(Math.random() * 10) - 5,
        icon: getWeatherIcon(forecastCondition)
      });
    }

    // Generate contextual weather alerts
    const alerts = [];
    if (randomCondition === 'Thunderstorm') {
      alerts.push({ type: 'warning', message: 'Thunderstorm warning in effect for ' + cityData.name });
    }
    if (temp > 35) {
      alerts.push({ type: 'heat', message: 'Heat advisory - Stay hydrated and avoid prolonged sun exposure' });
    }
    if (randomCondition === 'Rain') {
      alerts.push({ type: 'info', message: 'Rain expected - Bring an umbrella and drive carefully' });
    }
    if (randomCondition === 'Snow' && cityData.continent !== 'Africa') {
      alerts.push({ type: 'warning', message: 'Snow advisory - Check road conditions before traveling' });
    }
    if (temp < 0) {
      alerts.push({ type: 'warning', message: 'Freezing temperatures - Protect pipes and plants' });
    }

    setWeatherAlerts(alerts);

    // Get local time for the city
    const localTime = new Date().toLocaleString('en-US', {
      timeZone: cityData.timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    return {
      location: {
        name: cityData.name,
        country: cityData.country,
        continent: cityData.continent,
        localtime: localTime,
        timezone: cityData.timezone
      },
      current: {
        temp_c: temp,
        temp_f: Math.round((temp * 9 / 5) + 32),
        condition: {
          text: randomCondition,
          icon: getWeatherIcon(randomCondition)
        },
        feelslike_c: temp + Math.floor(Math.random() * 6) - 3,
        feelslike_f: Math.round(((temp + Math.floor(Math.random() * 6) - 3) * 9 / 5) + 32),
        humidity: getRegionalHumidity(cityData, randomCondition),
        wind_kph: Math.floor(Math.random() * 25) + 5,
        wind_mph: Math.floor(Math.random() * 15) + 3,
        wind_dir: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)],
        pressure_mb: Math.floor(Math.random() * 50) + 1000,
        vis_km: randomCondition.includes('Mist') || randomCondition.includes('Rain') ?
          Math.floor(Math.random() * 5) + 2 : Math.floor(Math.random() * 15) + 10,
        uv: getUVIndex(cityData, randomCondition),
        air_quality: getAirQuality(cityData),
        dewpoint_c: temp - Math.floor(Math.random() * 15) - 5
      },
      forecast: forecast
    };
  };

  // Get regional weather patterns based on location and season
  const getRegionalWeatherPattern = (cityData) => {
    const month = new Date().getMonth(); // 0-11
    const { continent, country, name } = cityData;

    let baseTemp = 20;
    let likelyConditions = ['Sunny', 'Partly Cloudy', 'Cloudy'];

    // Regional temperature and weather patterns
    if (continent === 'Asia') {
      if (country === 'Philippines') {
        baseTemp = 28 + Math.floor(Math.random() * 8);
        likelyConditions = month >= 5 && month <= 10 ?
          ['Rain', 'Thunderstorm', 'Cloudy', 'Partly Cloudy'] :
          ['Sunny', 'Partly Cloudy', 'Cloudy'];
      } else if (['India', 'Thailand', 'Malaysia', 'Indonesia'].includes(country)) {
        baseTemp = 30 + Math.floor(Math.random() * 10);
        likelyConditions = ['Sunny', 'Partly Cloudy', 'Thunderstorm', 'Rain'];
      } else if (['Japan', 'South Korea'].includes(country)) {
        baseTemp = month >= 5 && month <= 8 ? 25 + Math.floor(Math.random() * 8) : 10 + Math.floor(Math.random() * 15);
        likelyConditions = month >= 5 && month <= 8 ?
          ['Sunny', 'Partly Cloudy', 'Rain'] :
          ['Cloudy', 'Snow', 'Partly Cloudy'];
      } else if (country === 'China') {
        baseTemp = month >= 4 && month <= 9 ? 22 + Math.floor(Math.random() * 12) : 5 + Math.floor(Math.random() * 15);
        likelyConditions = ['Sunny', 'Cloudy', 'Partly Cloudy', 'Mist'];
      }
    } else if (continent === 'Europe') {
      baseTemp = month >= 4 && month <= 9 ? 15 + Math.floor(Math.random() * 15) : 2 + Math.floor(Math.random() * 12);
      likelyConditions = month >= 4 && month <= 9 ?
        ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rain'] :
        ['Cloudy', 'Rain', 'Snow', 'Overcast'];
    } else if (continent === 'North America') {
      if (country === 'United States') {
        if (['Miami', 'Los Angeles', 'San Francisco'].includes(name)) {
          baseTemp = 20 + Math.floor(Math.random() * 12);
          likelyConditions = ['Sunny', 'Partly Cloudy'];
        } else {
          baseTemp = month >= 4 && month <= 9 ? 18 + Math.floor(Math.random() * 15) : 0 + Math.floor(Math.random() * 15);
          likelyConditions = month >= 4 && month <= 9 ?
            ['Sunny', 'Partly Cloudy', 'Thunderstorm', 'Rain'] :
            ['Cloudy', 'Snow', 'Overcast'];
        }
      } else if (country === 'Canada') {
        baseTemp = month >= 5 && month <= 8 ? 15 + Math.floor(Math.random() * 15) : -5 + Math.floor(Math.random() * 15);
        likelyConditions = month >= 5 && month <= 8 ?
          ['Sunny', 'Partly Cloudy', 'Rain'] :
          ['Snow', 'Cloudy', 'Overcast'];
      }
    } else if (continent === 'Oceania') {
      // Southern hemisphere - seasons are opposite
      baseTemp = (month >= 10 || month <= 2) ? 22 + Math.floor(Math.random() * 12) : 12 + Math.floor(Math.random() * 15);
      likelyConditions = ['Sunny', 'Partly Cloudy', 'Rain'];
    } else if (continent === 'Africa') {
      baseTemp = 25 + Math.floor(Math.random() * 15);
      likelyConditions = ['Sunny', 'Partly Cloudy', 'Cloudy'];
    } else if (continent === 'South America') {
      // Southern hemisphere
      baseTemp = (month >= 10 || month <= 2) ? 25 + Math.floor(Math.random() * 10) : 15 + Math.floor(Math.random() * 12);
      likelyConditions = ['Sunny', 'Partly Cloudy', 'Rain', 'Thunderstorm'];
    }

    return { temp: baseTemp, likelyConditions };
  };

  // Get regional humidity patterns
  const getRegionalHumidity = (cityData, condition) => {
    const { continent, country } = cityData;
    let baseHumidity = 50;

    if (continent === 'Asia' && ['Philippines', 'Thailand', 'Malaysia', 'Indonesia'].includes(country)) {
      baseHumidity = 70;
    } else if (continent === 'Africa' || (continent === 'North America' && country === 'Mexico')) {
      baseHumidity = 30;
    } else if (continent === 'Europe') {
      baseHumidity = 60;
    }

    if (condition.includes('Rain') || condition.includes('Thunderstorm')) {
      baseHumidity += 20;
    } else if (condition === 'Sunny') {
      baseHumidity -= 10;
    }

    return Math.max(20, Math.min(95, baseHumidity + Math.floor(Math.random() * 20) - 10));
  };

  // Get UV index based on location and weather
  const getUVIndex = (cityData, condition) => {
    const { continent } = cityData;
    let baseUV = 5;

    if (continent === 'Africa' || continent === 'Oceania') {
      baseUV = 8;
    } else if (continent === 'Asia' && cityData.country === 'Philippines') {
      baseUV = 9;
    }

    if (condition === 'Sunny') {
      baseUV += 2;
    } else if (condition.includes('Cloud') || condition.includes('Rain')) {
      baseUV -= 3;
    }

    return Math.max(1, Math.min(11, baseUV + Math.floor(Math.random() * 3) - 1));
  };

  // Get air quality based on city size and region
  const getAirQuality = (cityData) => {
    const { name, country } = cityData;
    const majorCities = ['Beijing', 'Shanghai', 'New Delhi', 'Mumbai', 'Mexico City', 'Los Angeles', 'Jakarta'];

    if (majorCities.includes(name)) {
      return Math.floor(Math.random() * 100) + 80; // 80-180 (moderate to unhealthy)
    } else if (country === 'Philippines') {
      return Math.floor(Math.random() * 80) + 40; // 40-120 (good to moderate)
    } else {
      return Math.floor(Math.random() * 120) + 30; // 30-150 (good to unhealthy for sensitive)
    }
  };

  const getWeatherIcon = (condition) => {
    const iconMap = {
      'Sunny': '☀️',
      'Cloudy': '☁️',
      'Partly Cloudy': '⛅',
      'Rain': '🌧️',
      'Snow': '❄️',
      'Mist': '🌫️',
      'Thunderstorm': '⛈️',
      'Overcast': '☁️'
    };
    return iconMap[condition] || '🌤️';
  };

  // Handle search suggestions
  const handleCityInput = (value) => {
    setCity(value);

    if (value.length >= 2) {
      const filtered = worldCities
        .filter(city =>
          city.name.toLowerCase().includes(value.toLowerCase()) ||
          city.country.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 8)
        .sort((a, b) => {
          // Prioritize exact matches and popular cities
          const aExact = a.name.toLowerCase().startsWith(value.toLowerCase());
          const bExact = b.name.toLowerCase().startsWith(value.toLowerCase());
          if (aExact && !bExact) return -1;
          if (!aExact && bExact) return 1;
          return a.name.localeCompare(b.name);
        });

      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (cityData) => {
    const fullCityName = `${cityData.name}, ${cityData.country}`;
    setCity(fullCityName);
    setShowSuggestions(false);
    fetchWeather(cityData.name);
  };

  const fetchWeather = async (cityName) => {
    if (!cityName.trim()) return;

    setLoading(true);
    setError(null);
    setShowKuyaKim(true);
    setShowSuggestions(false);

    try {
      await new Promise(resolve => setTimeout(resolve, 1200));

      // Find city in database
      const cityData = findCityData(cityName);

      if (!cityData) {
        setError(`City "${cityName}" not found in our database. Please try a different city or check the spelling.`);
        return;
      }

      const weatherData = generateRealisticWeatherData(cityData);
      setWeatherData(weatherData);

      localStorage.setItem('lastWeatherSearch', JSON.stringify(weatherData));

      // Store full city name with country for history
      const fullCityName = `${cityData.name}, ${cityData.country}`;
      const newHistory = [fullCityName, ...searchHistory.filter(item => item !== fullCityName)].slice(0, 8);
      setSearchHistory(newHistory);
      localStorage.setItem('weatherSearchHistory', JSON.stringify(newHistory));

    } catch (err) {
      setError('Unable to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
      setTimeout(() => setShowKuyaKim(false), 3000);
    }
  };

  const handleHistoryClick = (historyItem) => {
    // Extract city name from "City, Country" format
    const cityName = historyItem.split(',')[0].trim();
    fetchWeather(cityName);
  };

  const addToFavorites = (cityName) => {
    if (!favorites.includes(cityName)) {
      const newFavorites = [...favorites, cityName];
      setFavorites(newFavorites);
      localStorage.setItem('weatherFavorites', JSON.stringify(newFavorites));
    }
  };

  const removeFromFavorites = (cityName) => {
    const newFavorites = favorites.filter(fav => fav !== cityName);
    setFavorites(newFavorites);
    localStorage.setItem('weatherFavorites', JSON.stringify(newFavorites));
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('weatherDarkMode', JSON.stringify(newMode));
  };

  const toggleTemperatureUnit = () => {
    const newUnit = temperatureUnit === 'C' ? 'F' : 'C';
    setTemperatureUnit(newUnit);
    localStorage.setItem('weatherTempUnit', newUnit);
  };

  const getTemperature = (tempC, tempF) => {
    return temperatureUnit === 'C' ? `${tempC}°C` : `${tempF}°F`;
  };

  const clearAllData = () => {
    localStorage.removeItem('weatherSearchHistory');
    localStorage.removeItem('weatherFavorites');
    localStorage.removeItem('lastWeatherSearch');
    setSearchHistory([]);
    setFavorites([]);
    setWeatherData(null);
  };

  const getBackgroundClass = (condition) => {
    if (!condition) return 'default-bg';

    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) return 'sunny-bg';
    if (conditionLower.includes('cloud') || conditionLower.includes('overcast')) return 'cloudy-bg';
    if (conditionLower.includes('rain') || conditionLower.includes('shower')) return 'rainy-bg';
    if (conditionLower.includes('snow')) return 'snowy-bg';
    if (conditionLower.includes('mist') || conditionLower.includes('fog')) return 'misty-bg';
    if (conditionLower.includes('thunder')) return 'stormy-bg';
    return 'default-bg';
  };

  const getAirQualityStatus = (aqi) => {
    if (aqi <= 50) return { status: 'Good', color: '#00e400' };
    if (aqi <= 100) return { status: 'Moderate', color: '#ffff00' };
    if (aqi <= 150) return { status: 'Unhealthy for Sensitive', color: '#ff7e00' };
    if (aqi <= 200) return { status: 'Unhealthy', color: '#ff0000' };
    return { status: 'Very Unhealthy', color: '#8f3f97' };
  };

  return (
    <div className={`weather-container ${isDarkMode ? 'dark-mode' : 'light-mode'} ${weatherData && getBackgroundClass(weatherData.current.condition.text)}`}>
      {/* Kuya Kim GIF Overlay */}
      {showKuyaKim && (
        <div className="kuya-kim-overlay">
          <div className="kuya-kim-container">
            <img
              src="https://media1.tenor.com/m/84EJKHC7ECAAAAAd/kuya-kim-konting-kaalaman.gif"
              alt="Kuya Kim Weather"
              className="kuya-kim-gif"
            />
            <p className="kuya-kim-text">Kuya Kim is checking the weather...</p>
          </div>
        </div>
      )}

      <div className="weather-app">
        {/* Header with controls */}
        <header className="app-header">
          <div className="header-content">
            <div className="title-section">
              <h1 className="app-title">GlobalWeather</h1>
              <p className="app-subtitle">Worldwide Weather Intelligence</p>
            </div>
            <div className="header-controls">
              <button className="control-btn" onClick={toggleTemperatureUnit}>
                °{temperatureUnit}
              </button>
              <button className="control-btn" onClick={toggleDarkMode}>
                {isDarkMode ? '☀️' : '🌙'}
              </button>
              <button className="control-btn clear-btn" onClick={clearAllData} title="Clear All Data">
                🗑️
              </button>
            </div>
          </div>
        </header>

        {/* Weather Alerts */}
        {weatherAlerts.length > 0 && (
          <div className="alerts-section">
            {weatherAlerts.map((alert, index) => (
              <div key={index} className={`alert alert-${alert.type}`}>
                <span className="alert-icon">
                  {alert.type === 'warning' ? '⚠️' : alert.type === 'heat' ? '🔥' : 'ℹ️'}
                </span>
                {alert.message}
              </div>
            ))}
          </div>
        )}

        {/* Search Section */}
        <div className="search-section">
          <div className="search-wrapper">
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search for a city worldwide..."
                value={city}
                onChange={(e) => handleCityInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const cityName = city.split(',')[0].trim();
                    fetchWeather(cityName);
                    setCity('');
                  } else if (e.key === 'Escape') {
                    setShowSuggestions(false);
                  }
                }}
                onFocus={() => {
                  if (suggestions.length > 0) setShowSuggestions(true);
                }}
              />
              <button
                className="search-btn"
                onClick={() => {
                  const cityName = city.split(',')[0].trim();
                  fetchWeather(cityName);
                  setCity('');
                }}
                disabled={loading}
              >
                {loading ? '⏳' : '🔍'}
              </button>
            </div>

            {/* Search Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="suggestions-dropdown">
                {suggestions.map((cityData, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onClick={() => selectSuggestion(cityData)}
                  >
                    <div className="suggestion-main">
                      <span className="suggestion-city">{cityData.name}</span>
                      <span className="suggestion-country">{cityData.country}</span>
                    </div>
                    <div className="suggestion-continent">{cityData.continent}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Access Sections */}
          <div className="quick-access-grid">
            {searchHistory.length > 0 && (
              <div className="quick-access">
                <h3>Recent Searches</h3>
                <div className="history-chips">
                  {searchHistory.map((historyCity, index) => (
                    <button
                      key={index}
                      className="chip"
                      onClick={() => handleHistoryClick(historyCity)}
                    >
                      📍 {historyCity}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {favorites.length > 0 && (
              <div className="quick-access">
                <h3>Favorites</h3>
                <div className="history-chips">
                  {favorites.map((favCity, index) => (
                    <button
                      key={index}
                      className="chip favorite-chip"
                      onClick={() => handleHistoryClick(favCity)}
                    >
                      ⭐ {favCity}
                      <span
                        className="remove-fav"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromFavorites(favCity);
                        }}
                      >
                        ×
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Fetching weather data...</p>
          </div>
        )}

        {/* Weather Display */}
        {weatherData && !loading && (
          <div className="weather-display">
            <div className="main-weather-card">
              {/* Weather Header */}
              <div className="weather-header">
                <div className="location-info">
                  <h2 className="city-name">{weatherData.location.name}</h2>
                  <p className="country">{weatherData.location.country}</p>
                  {weatherData.location.continent && (
                    <p className="continent">{weatherData.location.continent}</p>
                  )}
                  <p className="last-updated">Local time: {weatherData.location.localtime}</p>
                </div>
                <div className="header-actions">
                  <button
                    className={`favorite-btn ${favorites.includes(weatherData.location.name) ? 'favorited' : ''}`}
                    onClick={() => {
                      if (favorites.includes(weatherData.location.name)) {
                        removeFromFavorites(weatherData.location.name);
                      } else {
                        addToFavorites(weatherData.location.name);
                      }
                    }}
                  >
                    {favorites.includes(weatherData.location.name) ? '⭐' : '☆'}
                  </button>
                  <button
                    className="forecast-toggle"
                    onClick={() => setShowForecast(!showForecast)}
                  >
                    📊
                  </button>
                </div>
              </div>

              {/* Main Temperature Display */}
              <div className="temperature-display">
                <div className="temp-main">
                  <span className="temperature">
                    {temperatureUnit === 'C' ? weatherData.current.temp_c : weatherData.current.temp_f}°
                  </span>
                  <div className="temp-details">
                    <span className="temp-unit">{temperatureUnit}</span>
                    <span className="feels-like">
                      Feels like {getTemperature(weatherData.current.feelslike_c, weatherData.current.feelslike_f)}
                    </span>
                  </div>
                </div>
                <div className="weather-icon-container">
                  <span className="weather-icon-large">{weatherData.current.condition.icon}</span>
                  <p className="condition-text">{weatherData.current.condition.text}</p>
                </div>
              </div>

              {/* Weather Metrics Grid */}
              <div className="weather-metrics">
                <div className="metric-card">
                  <div className="metric-icon">💧</div>
                  <div className="metric-info">
                    <span className="metric-label">Humidity</span>
                    <span className="metric-value">{weatherData.current.humidity}%</span>
                  </div>
                </div>

                <div className="metric-card">
                  <div className="metric-icon">💨</div>
                  <div className="metric-info">
                    <span className="metric-label">Wind</span>
                    <span className="metric-value">{weatherData.current.wind_kph} km/h {weatherData.current.wind_dir}</span>
                  </div>
                </div>

                <div className="metric-card">
                  <div className="metric-icon">📊</div>
                  <div className="metric-info">
                    <span className="metric-label">Pressure</span>
                    <span className="metric-value">{weatherData.current.pressure_mb} mb</span>
                  </div>
                </div>

                <div className="metric-card">
                  <div className="metric-icon">👁️</div>
                  <div className="metric-info">
                    <span className="metric-label">Visibility</span>
                    <span className="metric-value">{weatherData.current.vis_km} km</span>
                  </div>
                </div>

                <div className="metric-card">
                  <div className="metric-icon">☀️</div>
                  <div className="metric-info">
                    <span className="metric-label">UV Index</span>
                    <span className="metric-value">{weatherData.current.uv}</span>
                  </div>
                </div>

                <div className="metric-card">
                  <div className="metric-icon">🌬️</div>
                  <div className="metric-info">
                    <span className="metric-label">Air Quality</span>
                    <span className="metric-value" style={{ color: getAirQualityStatus(weatherData.current.air_quality).color }}>
                      {getAirQualityStatus(weatherData.current.air_quality).status}
                    </span>
                  </div>
                </div>
              </div>

              {/* 5-Day Forecast */}
              {showForecast && (
                <div className="forecast-section">
                  <h3 className="forecast-title">5-Day Forecast</h3>
                  <div className="forecast-grid">
                    {weatherData.forecast.map((day, index) => (
                      <div key={index} className="forecast-card">
                        <div className="forecast-date">{day.date}</div>
                        <div className="forecast-icon">{day.icon}</div>
                        <div className="forecast-condition">{day.condition}</div>
                        <div className="forecast-temps">
                          <span className="high">{getTemperature(day.high, Math.round((day.high * 9 / 5) + 32))}</span>
                          <span className="low">{getTemperature(day.low, Math.round((day.low * 9 / 5) + 32))}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
