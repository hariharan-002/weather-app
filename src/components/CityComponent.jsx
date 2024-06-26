import React from "react";
import styled from "styled-components";

const CityForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 2px solid black;
  border-radius: 4px;
  font-size: 14px;
  
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
`;

const CityComponent = ({ setCity, fetchWeather }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <CityForm onSubmit={handleFormSubmit}>
      <Input
        type="text"
        placeholder="Enter city"
        onChange={(e) => setCity(e.target.value)}
      />
      <Button type="submit">Search</Button>
    </CityForm>
  );
};

export default CityComponent;
