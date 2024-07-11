import './CurrentWeatherInfo.css';
import { useState, useEffect } from 'react';
import {convertUnixToReadableDateTime} from '../utils/timeUtils';
import {formatWindData} from '../utils/formatWindData';

const CurrentWeatherInfo = ({weatherData}) => {
    const [ mainWeather, setMainWeather ] = useState('');
    const [ descriptionWeather, setDescriptionWeather ] = useState('');
    const [ weatherIcon, setWeatherIcon] = useState('');
    const [ currentDatetime, setCurrentDatetime ] = useState('');
    const [ country, setCountry] = useState('');
    const [ wind, setWind] = useState('');


    useEffect(() => {
        if (weatherData) {
            const currentWeather = weatherData.list[0];
            const mainWeather = currentWeather.weather[0];
            const date = convertUnixToReadableDateTime(currentWeather.dt);

            setMainWeather(mainWeather.main);
            setCurrentDatetime(date);
            setDescriptionWeather(mainWeather.description)
            setWeatherIcon(`https://openweathermap.org/img/wn/${mainWeather.icon}.png`)
            setCountry(weatherData.city.country);
            setWind(formatWindData(currentWeather.wind, currentWeather.main.humidity));
        }
    }, [weatherData]);

    return (
        <div>
            <div className="container">
                <p>Weather Forecast</p>
                <h1>{mainWeather}<br/>with <span className="capitalize">{descriptionWeather}</span></h1>
            </div>
            <div className='container'>
                <p className='inline-flex bolder'>
                    <img src={weatherIcon} alt='weather icon'></img>
                    <span>{country}, {currentDatetime}</span>
                </p>
                <div className='weatherInfo'>
                    {wind}
                </div>
            </div>

        </div>
    )
};

export default CurrentWeatherInfo;