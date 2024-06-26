import React from "react";
import styled from "styled-components";
import { WeatherIcons } from "../App"; 

const Location = styled.span`
  margin: 15px auto;
  text-transform: capitalize;
  font-size: 28px;
  font-weight: bold;
`;

const Condition = styled.span`
  margin: 20px auto;
  text-transform: capitalize;
  font-size: 14px;

  & span {
    font-size: 28px;
  }
`;

const WeatherInfoLabel = styled.span`
  margin: 20px 25px 10px;
  text-transform: capitalize;
  text-align: start;
  width: 90%;
  font-weight: bold;
  font-size: 14px;
  
`;

const WeatherLogo = styled.img`
  width: 100px;
  height: 100px;
  margin: 5px auto;
`;

const WeatherCondition = styled.div`
  display: flex;
  width: 100%;
  margin: 30px auto;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const WeatherInfoContainer = styled.div`
  display: flex;
  width: 90%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  font-weight: bold;
  text-shadow: 
    -1px -1px 0 white,  
    1px -1px 0 white,
    -1px 1px 0 white,
    1px 1px 0 white; /* Creates a white stroke effect */ 

`;


const InfoContainer = styled.div`
  display: flex;
  margin: 5px 10px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const InfoIcon = styled.img`
  width: 55px;
  height: 50px;
  filter:brightness(100%),contrast(110%), saturate(150%)
`;

const InfoLabel = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 15px;
  margin: 15px;

  & span {
    font-size: 15px;
    text-transform: capitalize;
  }
`;

const WeatherInfoComponent = ({ name, value }) => {
  return (
    <InfoContainer>
      <InfoIcon src={WeatherIcons[name]} alt={name} />
      <InfoLabel>
        {value}
        <span>{name}</span>
      </InfoLabel>
    </InfoContainer>
  );
};

const WeatherComponent = ({ weather }) => {
  const isDay = weather?.weather[0].icon?.includes("d");
  const getTime = (timeStamp) => {
    return `${new Date(timeStamp * 1000).getHours()}:${new Date(
      timeStamp * 1000
    ).getMinutes()}`;
  };

  return (
    <>
      <WeatherCondition>
        <Condition>
          <span>{`${Math.floor(weather?.main?.temp - 273)}°C`}</span>
          {`  |  ${weather?.weather[0].description}`}
        </Condition>
        <WeatherLogo
          src={WeatherIcons[weather?.weather[0].icon]}
          alt="Weather Icon"
        />
      </WeatherCondition>

      <Location>{`${weather?.name}, ${weather?.sys?.country}`}</Location>

      <WeatherInfoLabel>Weather Info</WeatherInfoLabel>
      <WeatherInfoContainer>
        <WeatherInfoComponent
          name={isDay ? "sunset" : "sunrise"}
          value={getTime(weather?.sys[isDay ? "sunset" : "sunrise"])}
        />
        <WeatherInfoComponent name="humidity" value={weather?.main?.humidity} />
        <WeatherInfoComponent name="wind" value={weather?.wind?.speed} />
        <WeatherInfoComponent name="pressure" value={weather?.main?.pressure} />
      </WeatherInfoContainer>
    </>
  );
};

export default WeatherComponent;
