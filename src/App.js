import "./App.css";
import axios from "axios";

import Chart from "./Components/chart";
import Conditions from "./Components/conditions";
import CurrentWeather from "./Components/currentWeather";
import Forecast from "./Components/forecast";
import { useEffect, useState } from "react";

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  //hold currentData
  const [currentWeather, setCurrentWeather] = useState({
    weather: "",
    temp: "",
    icon: "",
    humidity: "",
    windSpeed: "",
    city: "",
  });

  //hold forecastData
  const [forecastData, setForecastData] = useState();
  const [midDayForecastData, setMidDayForecastData] = useState();

  //calling api to get weather data
  async function getWeatherData(url) {
    const { data } = await axios.get(url);
    console.log(data, "weatheeer");
    setCurrentWeather({
      weather: data?.weather[0].main,
      temp: Math.round(data?.main?.temp),
      icon: data?.weather[0].icon,
      humidity: data?.main?.humidity,
      windSpeed: data?.wind?.speed,
      city: data?.name,
    });
  }

  //calling api to get forecast data
  async function getForecastData(url) {
    const data = await axios.get(url);
    console.log(data, "dataaaaaa");
    setForecastData(data.list);
    let filteredData = data.list.filter((item) => {
      return item.dt_txt.includes("12:00:00");
    });
    setMidDayForecastData(filteredData);
  }

  async function getForecastData(url) {
    const { data } = await axios.get(url);
  }

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        getWeatherData(
          `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}`
        );
        getForecastData(
          `https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}`
        );
      });
    } else {
      alert("location not available");
    }
  }, []);
  return (
    <div className="weather-container">
      <div>
        <form>
          <input type="text" placeholder="Search City" />
          <button>Search</button>
        </form>
        <div className="city">
          <p>Showing results for: {currentWeather.city}</p>
        </div>
        {currentWeather ? (
          <CurrentWeather
            weather={currentWeather.weather}
            temp={currentWeather.temp}
            icon={currentWeather.icon}
          />
        ) : null}

        {currentWeather ? (
          <Conditions
            humidity={currentWeather.humidity}
            windSpeed={currentWeather.windSpeed}
          />
        ) : null}
      </div>

      <Chart />
    </div>
  );
}

export default App;
