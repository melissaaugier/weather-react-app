import './WeatherForecast.css';
import {useState, useEffect} from 'react';
import { formatForecastData } from '../utils/formatForecastData';

const WeatherForecast = ({weatherData}) => {
    const [weatherForecast, setWeatherForecast] = useState([]);

    useEffect(() => {
        if (weatherData && weatherData.list) {
            const formattedData = formatForecastData(weatherData.list);
            setWeatherForecast(formattedData);
            console.log(weatherForecast);
        }
    }, [weatherData]);

    return (
        <div className='forecast-grid container'>
            {weatherForecast.map((day, index) => (
                <div key={index} className='col'>
                    <p>high {day.maxTemp}°C</p>
                    <p>low {day.minTemp}°C</p>
                    <p className='emphasize-number'>{day.temp}°</p>
                    <p>{day.date}</p>
                </div>
            ))}
        </div>
    );
};

export default WeatherForecast;
