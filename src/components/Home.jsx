import React, { useEffect, useState } from "react";
import "./Home.css";
import windSpeedIcon from "../assets/wind-speed.gif";
import humidityIcon from "../assets/humidity.gif";
import cloudsIcon from "../assets/clouds.gif";
import loadingIcon from "../assets/loading-weather.gif";

import sadCloudIcon from "../assets/sad-cloud.png";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
const Home = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [backgroundImage, setBackgroundImage] = useState("");
  const API_KEY = process.env.REACT_APP_API_KEY;
  const ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const dateOptions = {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const formattedTime = currentDateTime.toLocaleTimeString(
    "en-US",
    timeOptions
  );
  const formattedDate = currentDateTime.toLocaleDateString(
    "en-US",
    dateOptions
  );
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const url = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&lat=${latitude}&lon=${longitude}&units=metric`;
          fetchWeather(url);
          fetchBackgroundImage("weather");
        },
        (error) => {
          setError("Unable to retrieve your location");
          toast.error("Unable to retrieve your location");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser");
      toast.error("Geolocation is not supported by this browser");
    }
  }, [API_KEY]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&q=${location}&units=metric`;
    fetchWeather(url);
    fetchBackgroundImage(location);
    setLocation("");
  };
  const fetchWeather = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setWeatherData(response.data);

      setError("");
    } catch (err) {
      // setError("Location not found or error fetching data");
      setWeatherData(null);
      toast.error("Location not found or error fetching data");
    }
    setLoading(false);
  };
  const fetchBackgroundImage = async (query) => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${"xNzUs-iA8MW28-qdvTBRmM0S0_qDKg6nsFlIGPAP3AQ"}&per_page=20`
      );
      if (response.data.results.length > 0) {
        setBackgroundImage(response.data.results[0].urls.full);
      } else {
        setBackgroundImage("");
      }
    } catch (err) {
      console.error("Error fetching background image", err);
      setBackgroundImage("");
    }
  };

  return (
    <div className="main-container">
      <div className="row weather-conatiner">
        <div
          className="col col-md-7 image-container"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="gradient"></div>
          <div className="location-info">
            <h1>{weatherData?.name}</h1>
            <h2>IN</h2>
          </div>
          <div className="time-temp">
            <div>
              <time>{formattedTime}</time>
              <p className="mb-0">{formattedDate}</p>
            </div>
            <div className="temp">{/* <h3 className="mb-0">33°C</h3> */}</div>
          </div>
        </div>
        <div className="col col-md-5 text-container">
          <div>
            <form className="search-container" onSubmit={handleSubmit}>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter city or zip code"
                className="input-field"
              />

              <button type="submit">
                <span className="material-symbols-outlined">search</span>
              </button>
            </form>
          </div>
          {!loading && error && (
            <div className="error-message">
              <img src={sadCloudIcon} alt="sad-cloud" />
              <p>Oops! couldn't found the location you are looking for </p>
            </div>
          )}
          {loading && (
            <img src={loadingIcon} alt="loading" className="img-fluid" />
          )}

          {!loading && weatherData && (
            <>
              {" "}
              <div className="search-results">
                <h1 className="temp-results">{weatherData?.main?.temp}°c</h1>
                <p className="description">
                  {weatherData?.weather?.[0].description}
                </p>
                <div className="row gx-2">
                  <div className="col col-md-4">
                    <div className="stats">
                      <img src={humidityIcon} alt="wind speed" />
                      <p>{weatherData?.main?.humidity}%</p>
                    </div>
                  </div>
                  <div className="col col-md-4">
                    <div className="stats">
                      <img src={windSpeedIcon} alt="wind speed" />
                      <p>{weatherData?.clouds?.all} km/h</p>
                    </div>
                  </div>
                  <div className="col col-md-4">
                    <div className="stats">
                      <img src={cloudsIcon} alt="wind speed" />
                      <p>
                        {weatherData?.wind?.speed}
                        <span>%</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
