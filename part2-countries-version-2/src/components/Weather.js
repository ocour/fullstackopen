import { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ country }) => {
    const [weather, setWeather] = useState([]);

    const api_key = process.env.REACT_APP_WEATHER_API_KEY;
  
    useEffect(() => {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`)
        .then((response) => {
          setWeather(response.data);
        })
    }, [])
    
    // Since useEffect is run after first render
    // We need to check if weather array has info in it
    // other wise it will give an error
    if(weather.length !== 0)
    {
        return( 
            <div>
                <h2>Weather in {weather.name}</h2>
                <p>temperature {weather.main.temp} Celcius</p>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} ></img>
                <p>wind {weather.wind.speed} m/s</p>
            </div>
        )
    }
    else
    {
        return null;
    }
}

export default Weather;