import React, { useState } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import "./App.css";

const api_key = "cdf39c4f743e454f81644754231205";
const weather_endpoint = "current.json";
const BASE_URL_WEATHER = `http://api.weatherapi.com/v1/${weather_endpoint}?key=${api_key}&q=`;

const formatTime = (epoch) => {
  const date = new Date(epoch * 1000);
  return date.toLocaleTimeString();
};

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [errorFlag, setErrorFlag] = useState(false);
  const [errorMessage] = useState("Please Enter a valid city name!");

  const handleSubmit = async (e) => {
    setErrorFlag(false);

    if (!city.trim().length) {
      return;
    }

    try {
      const response = await axios.get(BASE_URL_WEATHER + city);
      if (response.status === 200) {
        const weather_data = response.data.current;
        const location_data = response.data.location;
        setWeatherData({
          feelslike_c: weather_data.feelslike_c,
          feelslike_f: weather_data.feelslike_f,
          gust_kph: weather_data.gust_kph,
          gust_mph: weather_data.gust_mph,
          humidity: weather_data.humidity,
          is_day: weather_data.is_day,
          last_updated: weather_data.last_updated,
          last_updated_epoch: weather_data.last_updated_epoch,
          precip_in: weather_data.precip_in,
          precip_mm: weather_data.precip_mm,
          pressure_in: weather_data.pressure_in,
          pressure_mb: weather_data.pressure_mb,
          temp_c: weather_data.temp_c,
          temp_f: weather_data.temp_f,
          uv: weather_data.uv,
          vis_km: weather_data.vis_km,
          vis_miles: weather_data.vis_miles,
          wind_degree: weather_data.wind_degree,
          wind_dir: weather_data.wind_dir,
          wind_kph: weather_data.wind_kph,
          wind_mph: weather_data.wind_mph,
          condition: {
            text: weather_data.condition.text,
            icon: weather_data.condition.icon,
            code: weather_data.condition.code,
          },
          country: location_data.country,
          lat: location_data.lat,
          localtime: location_data.localtime,
          localtime_epoch: location_data.localtime_epoch,
          lon: location_data.lon,
          name: location_data.name,
          region: location_data.region,
          tz_id: location_data.tz_id,
        });
      }
    } catch (err) {
      console.error("Entered value is not a valid city name...");
      setErrorFlag(true);
    }

    setCity("");
  };

  const handleReset = (e) => {
    setCity("");
    setWeatherData({});
    setErrorFlag(false);
  };

  return (
    <div>
      <div className="input-container">
        <div className="text-box">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
          />
          <button onClick={handleSubmit}>Get Weather</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>

      {weatherData.is_day && (
        <div className="weather-card">
          <div className="location">
            <h2>{`${weatherData.region}, ${weatherData.country}`}</h2>
            <p className="last-updated">
              Last updated: {formatTime(weatherData.last_updated_epoch)}
            </p>
          </div>
          <div className="weather-info">
            <div className="temperature">
              <h3>{`${weatherData.temp_c}\u00B0C`}</h3>
              <p className="condition">{weatherData.condition.text}</p>
            </div>
            <div className="details">
              <div>
                <img
                  className="icon"
                  src={weatherData.condition.icon}
                  alt="Weather Icon"
                />
                <div className="info-parent">
                  <Icon
                    icon="ph:thermometer"
                    color="currentColor"
                    width="20px"
                  />
                  <p className="feels-like">
                    Feels like: {`${weatherData.feelslike_c}\u00B0C`}
                  </p>
                </div>
              </div>
              <div>
                <div className="info-parent">
                  <Icon icon="ph:wind" color="currentColor" width="20px" />
                  <p className="info">Wind: {`${weatherData.wind_kph} km/h`}</p>
                </div>
                <div className="info-parent">
                  <Icon
                    icon="mdi:car-brake-low-pressure"
                    color="currentColor"
                    width="20px"
                  />
                  <p className="info">
                    Pressure: {`${weatherData.pressure_mb} mb`}
                  </p>
                </div>
                <div className="info-parent">
                  <Icon
                    icon="streamline:interface-weather-rain-2-cloud-rain-rainy-meteorology-precipitation-weather"
                    color="currentColor"
                    width="20px"
                  />
                  <p className="info">
                    Precipitation: {`${weatherData.precip_mm} mm`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {errorFlag && (
        <div className="error-card">
          <p className="error-message">{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default App;
