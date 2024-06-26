import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import CityComponent from "./components/CityComponent.jsx";
import WeatherComponent from "./components/WeatherInfoComponent";
import img1 from "./assets/img1.png";
import img2 from "./assets/img2.png";
import img3 from "./assets/img3.png";
import img4 from "./assets/img4.png";
import img5 from "./assets/img5.png";
import img6 from "./assets/img6.png";
import img7 from "./assets/img7.png";
import img8 from "./assets/img8.png";
import img9 from "./assets/img9.png";
import img10 from "./assets/img10.png";
import img11 from "./assets/img11.png";
import img12 from "./assets/img12.png";
import img13 from "./assets/img13.png";
import img14 from "./assets/img14.png";
import img15 from "./assets/img15.png";
import img16 from "./assets/img16.png";
import img17 from "./assets/img17.png";
import img18 from "./assets/img18.png";
import img19 from "./assets/img19.png";
import img20 from "./assets/img20.png";
import img21 from "./assets/img21.png";
import img22 from "./assets/img22.png";
import img23 from "./assets/img23.png";
import sunnyBackground from "./assets/clearsky.jpg";
import rainyBackground from "./assets/rainy.jpg";
import cloudyBackground from "./assets/cloudy.jpg";
import snowyBackground from "./assets/snow.jpg";
import mistyBackground from "./assets/misty.jpg";
import thunderstormBackground from "./assets/thunderstrom.jpg";
import nightBackground from "./assets/night.jpg";
import foggyBackground from "./assets/cloudy.jpg";
import windyBackground from "./assets/windy.jpg";
import clearNightBackground from "./assets/clearnight.jpg";
import partlyCloudyDayBackground from "./assets/cloudyday.jpg";
import partlyCloudyNightBackground from "./assets/cloudynight.jpg";

const backgrounds = {
  sunny: sunnyBackground,
  rainy: rainyBackground,
  cloudy: cloudyBackground,
  snowy: snowyBackground,
  misty: mistyBackground,
  thunderstorm: thunderstormBackground,
  night: nightBackground,
  foggy: foggyBackground,
  windy: windyBackground,
  clearNight: clearNightBackground,
  partlyCloudyDay: partlyCloudyDayBackground,
  partlyCloudyNight: partlyCloudyNightBackground,
};
export const WeatherIcons = {
  "01d": img1,
  "01n": img2,
  "02d": img3,
  "02n": img4,
  "03d": img5,
  "03n": img6,
  "04d": img7,
  "04n": img8,
  "09d": img9,
  "09n": img10,
  "10d": img11,
  "10n": img12,
  "11d": img13,
  "11n": img14,
  "13d": img15,
  "13n": img16,
  "50d": img17,
  "50n": img18,
  sunrise: img19,
  sunset: img20,
  humidity: img21,
  wind: img22,
  pressure: img23,
};

const API_KEY = "61e420edf91f8bff6dacaea797822b79";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 380px;
  padding: 20px 10px;
  margin: auto;
  border-radius: 4px;
  box-shadow: 0 3px 6px 0 #555;
  background: transparent; /* corrected spelling */
  font-family: Montserrat;
  text-shadow: 
    -1px -1px 0 white,  
    1px -1px 0 white,
    -1px 1px 0 white,
    1px 1px 0 white; /* Creates a white stroke effect */
`;

const AppLabel = styled.span`
  color: black;
  margin: 20px auto;
  font-size: 18px;
  font-weight: bold;
`;


function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  useEffect(() => {
    if (currentLocation) {
      fetchWeatherDataByCoordinates(currentLocation.latitude, currentLocation.longitude);
    }
  }, [currentLocation]);

  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        error => {
          console.error('Error fetching geolocation:', error);
          setError('Could not fetch current location. Please enter a city manually.');
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setError('Geolocation is not supported by this browser. Please enter a city manually.');
    }
  };

  const fetchWeatherData = async (cityName) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
      );
      setWeather(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Could not fetch weather data. Please try again.");
    }
  };

  const fetchWeatherDataByCoordinates = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      );
      setWeather(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Could not fetch weather data. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      fetchWeatherData(city);
    }
  };

  const getWeatherType = () => {
    if (!weather) return "sunny"; 

    const weatherType = weather.weather[0].main.toLowerCase();
    switch (weatherType) {
      case "rain":
      case "drizzle":
      case "thunderstorm":
        return "rainy";
      case "snow":
        return "snowy";
      case "mist":
      case "fog":
        return "misty";
      case "clouds":
        return "cloudy";
      case "clear":
        const sunsetTime = weather.sys.sunset * 1000;
        const currentTime = new Date().getTime(); 
        return currentTime > sunsetTime ? "clearNight" : "sunny";
      default:
        return "sunny";
    }
  };

  return (
    <div style={{ backgroundImage: `url(${backgrounds[getWeatherType()]})`, backgroundSize: 'cover', minHeight: '100vh' }}>
      <Container>
        <AppLabel>Weather vue</AppLabel>
        <CityComponent setCity={setCity} fetchWeather={() => fetchWeatherData(city)} />
        
        {error && <p>{error}</p>}
        {weather && (
          <WeatherComponent
            weather={weather}
            city={city}
            weatherIcon={WeatherIcons[weather.weather[0].icon]}
          />
        )}
      </Container>
      
    </div>
  );
}

export default App;
