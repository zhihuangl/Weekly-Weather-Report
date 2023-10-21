import React, { useState, useEffect } from 'react';

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

const WeatherTable = () => {
    const [sample, setSample] = useState(null);
    const [filterDate, setFilterDate] = useState('');
    const [filterTemperature, setFilterTemperature] = useState('');

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

    function handleDateChange(event) {
        setFilterDate(event.target.value);
    }

    function handleTemperatureChange(event) {
        setFilterTemperature(event.target.value);
    }

    function filterData() {
        if (!sample) return [];

        let filteredData = sample.data;

        if (filterDate) {
            filteredData = filteredData.filter(item => item.datetime.includes(filterDate));
        }

        if (filterTemperature) {
            filteredData = filteredData.filter(item => 
                item.low_temp.toString().includes(filterTemperature) ||
                item.high_temp.toString().includes(filterTemperature)
            );
        }

        return filteredData;
    }

    const filteredData = filterData();

    return (
        <div>
            {sample && (
                <div>
                    <h2>{sample.city_name}</h2>
                    <h3>{sample.state_code}, {sample.country_code}</h3>
                </div>
            )}
            <div className="weather-table">
                <div>
                    Filter by date
                    <input
                        type="text"
                        placeholder="2023-10-22"
                        value={filterDate}
                        onChange={handleDateChange}
                    />
                    <br></br>
                    Filter by Temperature
                    <input
                        type="text"
                        placeholder="18.1"
                        value={filterTemperature}
                        onChange={handleTemperatureChange}
                    />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Lowest Temperature</th>
                            <th>Highest Temperature</th>
                            <th>Weather Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.datetime}</td>
                                <td>{item.low_temp}</td>
                                <td>{item.high_temp}</td>
                                <td>{item.weather.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WeatherTable;
