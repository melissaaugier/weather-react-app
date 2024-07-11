import './WindTempComponent.css';
import React, {useEffect, useState} from 'react';
import {convertUnixToReadableTime} from '../utils/timeUtils';
import {formatRainfallData} from '../utils/formatRainFallData';
import RainfallChart from './RainfallChart';

const WindTempComponent = ({weatherData}) => {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [cityData, setCityData] = useState(null);
    const [currentTime, setCurrentTime] = useState(null);
    const [sunriseTime, setSunriseTime] = useState(null);
    const [sunsetTime, setSunsetTime] = useState(null);
    const [rainfallData, setRainfallData] = useState(null);

    useEffect(() => {
        if (weatherData) {
            const currentWeatherData = weatherData["list"][0];
            const cityDetails = weatherData["city"]; 
            const timezoneOffset = cityDetails.timezone;
            
            setRainfallData(formatRainfallData(weatherData, timezoneOffset));
            setCurrentWeather(currentWeatherData);
            setCityData(cityDetails);
            setCurrentTime(convertUnixToReadableTime(Date.now() / 1000, timezoneOffset));
            setSunriseTime(convertUnixToReadableTime(cityDetails.sunrise, timezoneOffset));
            setSunsetTime(convertUnixToReadableTime(cityDetails.sunset, timezoneOffset));
        }
    }, [weatherData]);

    if (!weatherData || !currentWeather || !cityData) { return null; }

    return(
        <div className='WindTempComponent'>
            { currentWeather && (
                <div>
                    <div className='container'>
                        <div className='d-flex'>
                            <div>
                                <p className='font-size-xxl'>{Math.round(currentWeather.main.temp)}°</p>
                            </div>
                            <p className='font-size-xxl'>&#177;</p>
                            <p className='font-size-xxl'>{Math.round(currentWeather.main.feels_like) - Math.round(currentWeather.main.temp)}°</p>
                        </div>
                        <div className='d-flex'>
                            <div> 
                                <p className='font-size-xxs'>Humidity</p>
                                <p className='font-size-m'>{currentWeather.main.humidity}%</p>
                            </div>
                            <p className='font-size-xs'>&#8779;&nbsp;Wind : {currentWeather.wind.speed}km.h</p>
                        </div>
                    </div>
                    <div className='container'>
                        <div className='d-flex'>
                            <img src="./img/icons/circles-sun.png" alt="sunrise icon" height='30'/>
                            <p className='font-size-xxs'>Local time: {currentTime}</p>
                        </div>
                        <table>
                            <tbody>
                                <tr>
                                    <td><p className="font-size-xs">Sunrise</p></td>
                                    <td><p className="font-size-xs">{sunriseTime}</p></td>
                                </tr>
                                <tr>
                                    <td><p className="font-size-xs">Sunset</p></td>
                                    <td><p className="font-size-xs">{sunsetTime}</p></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <RainfallChart rainfallData={rainfallData}/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default React.memo(WindTempComponent);