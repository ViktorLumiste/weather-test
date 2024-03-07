import React, {useState} from 'react'
import './App.css';

import {createMockServer} from "./createMockServer";
import Search from "./components/Search";
import WeatherCard from "./components/WeatherCard"

if(process.env.NODE_ENV === 'development'){
    createMockServer()
}

function WeatherApplication() {
    const [selected,setSelected] = useState([])

    const selectCity = (city) => {
        setSelected([city,...selected])
    }

    return (
        <div className="App">
            <h1>Weather application</h1>
            <Search onSelectItem={selectCity}></Search>
            <div data-testid="my-weather-list">
                {selected && selected.map((city) =>
                    <WeatherCard key={`${city.lat}-${city.lon}`} city={city} />
                )}
            </div>
        </div>
    );
}

export default WeatherApplication;