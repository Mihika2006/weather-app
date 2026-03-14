import React, { useState } from 'react'; 
import './App.css'; 

function App() {
  const [city, setCity] = useState('');
   const [weather, setWeather] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = import.meta.env.VITE_WEATHER_KEY; 
  console.log(API_KEY);
  console.log(import.meta.env.VITE_WEATHER_KEY);


  const fetchWeather = async (e) => { 
    e.preventDefault(); 
    if (!city) return; 

    setLoading(true); 
    setError(''); 
    
    try {
      const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod !== 200) { 
        setError(data.message); 
        setWeather(null);
      } else {
        setWeather(data);
        setCity(''); 
      }
    } catch (err) {
      setError("Failed to fetch weather data."); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="search-container">
        <h1>Weather Check</h1>
        <form onSubmit={fetchWeather}> 
          <input
            type="text" placeholder="Enter city name..." value={city} onChange={(e) => setCity(e.target.value)}/> 
          <button type="submit">Search</button>
        </form>
      </div>

      {loading && <p className="status">Loading...</p>} 
      {error && <p className="error-msg">{error}</p>} 

      {weather && !loading && (
        <div className="weather-card">
          <div className="header">
            <h2>{weather.name}, {weather.sys.country}</h2> 
            <img 
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
              alt="weather icon" 
            />
          </div>
          
          <div className="temp-display">
            <h3>{Math.round(weather.main.temp)}°C</h3>
            <p>{weather.weather[0].description}</p>
          </div>

          <div className="details-grid">
            <div className="detail-item">
              <span>Humidity</span>
              <strong>{weather.main.humidity}%</strong>
            </div>
            <div className="detail-item">
              <span>Wind Speed</span>
              <strong>{weather.wind.speed} m/s</strong>
            </div>
            <div className="detail-item">
              <span>Feels Like</span>
              <strong>{Math.round(weather.main.feels_like)}°C</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;