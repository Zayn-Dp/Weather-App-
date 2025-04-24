import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import searchIcon from "../assets/search.png";
import clear_Icon from "../assets/sun.png";
import humidity from "../assets/humidity.png";
import windSpeed from "../assets/windy.png";
import rain from "../assets/rain.png";
import drizzle_icon from "../assets/weather.png";
import clouds_Icon from "../assets/cloudy.png";
import snow from "../assets/snow.png";
function Weather() {
  const [weatherData, setweatherData] = useState(false);
  const inputRef = useRef();
  const allICons = {
    "01d": clear_Icon,
    "01n": clear_Icon,
    "02d": clouds_Icon,
    "02n": clouds_Icon,
    "03d": clouds_Icon,
    "03n": clouds_Icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };
  const search = async (city) => {
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    console.log("api key", API_KEY);
    if(city== "") {
      alert("input is empty")
      return
    }

    console.log(import.meta.env);
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
      const res = await fetch(url);
      if (!res.ok) {
        alert("City not found ");
        return;
      }
      const data = await res.json();
      console.log(data);

      const icon = allICons[data.weather[0].icon] || clear_Icon;
      setweatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setweatherData(false);
      console.error("Error in fecthing weather data");
    }
  };
  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input type="text" placeholder="Search" ref={inputRef} />
        <img
          src={searchIcon}
          onClick={() => search(inputRef.current.value)}
          alt=""
        />
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="" className="Image" />
          <p className="temprature">{weatherData.temperature}°C</p>
          <span className="location">{weatherData.location}</span>
          <div className="weather-data">
            <div className="col">
              <img src={humidity} alt="" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span className="humidity">Humidity</span>
              </div>
            </div>
            <div className="col">
              <div>
                <img src={windSpeed} alt="" />
                <p>{weatherData.windSpeed}km/h</p>
                <span>WindSpeed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Weather;
