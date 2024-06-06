import React, { useEffect, useState } from "react";
import "./Home.css";
import windSpeedIcon from "../assets/wind-speed.gif";
import humidityIcon from "../assets/humidity.gif";
import cloudsIcon from "../assets/clouds.gif";
import loadingIcon from "../assets/loading-weather.gif";

const Home = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const API_KEY = process.env.REACT_APP_API_KEY;

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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="main-container">
      <div className="row weather-conatiner">
        <div className="col col-md-7 image-container">
          <div className="location-info">
            <h1>Hyderabad</h1>
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
                <span class="material-symbols-outlined">search</span>
              </button>
            </form>
          </div>
          {/* {error && <Alert variant="danger">{error}</Alert>} */}

          {loading && (
            <img src={loadingIcon} alt="loading" className="img-fluid" />
          )}
          {!loading && weatherData && (
            <>
              {" "}
              <div className="search-results">
                <h1 className="temp-results">34°c</h1>
                <div className="row gx-2">
                  <div className="col col-md-4">
                    <div className="stats">
                      <img src={humidityIcon} alt="wind speed" />
                      <p>62%</p>
                    </div>
                  </div>
                  <div className="col col-md-4">
                    <div className="stats">
                      <img src={windSpeedIcon} alt="wind speed" />
                      <p>22 km/h</p>
                    </div>
                  </div>
                  <div className="col col-md-4">
                    <div className="stats">
                      <img src={cloudsIcon} alt="wind speed" />
                      <p>
                        44
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
