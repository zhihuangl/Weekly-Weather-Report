import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

const DetailedInfo = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const date = searchParams.get("date");

  const [sample, setSample] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const city = 'NewYorkCity';
        const state_abbrev = 'NY';
        const link = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city},${state_abbrev}&key=${ACCESS_KEY}`;
        const response = await fetch(link);

        if (!response.ok) {
          throw new Error('Failed to get weather report');
        }

        const data = await response.json();
        setSample(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Date: {date}</h1>
      {sample && (
        <div>
          <p>Cloud Coverage: {sample.data.clouds}%</p>
          <p>Relative Humidity: {sample.data.rh}%</p>
          <p>Air Quality Index: {sample.data.aqi}</p>
          <p>Wind Speed: {sample.data.wind_spd}m/s</p>

        </div>
      )}
    </div>
  );
};

export default DetailedInfo;
