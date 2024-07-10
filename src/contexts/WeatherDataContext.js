import React, { createContext, useState, useEffect } from 'react';

export const WeatherDataContext = createContext();

const apiKey = process.env.REACT_APP_KEY_OPENWEATHER; 
const apiUrlBase = 'https://api.openweathermap.org/data/2.5/forecast?cnt=8&units=metric';

export const WeatherDataProvider = ({ children }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [bgImg, setBgImg] = useState('drizzle');

    const fetchWeather = async (city) => {
        if (!city) return;
        
        setLoading(true);
        setError(null);
        
        try {
            const apiUrl = `${apiUrlBase}&q=${city}&APPID=${apiKey}`;
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('City not found');
            }
                
            const data = await response.json();
            setWeatherData(data);
            setBgImg(getWeatherBackground(data));
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setError('Error fetching weather data');
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    };

    const getWeatherBackground = (data) => {
        // Customize this function to return the appropriate background image based on weather data
        return data.list[0].weather[0].main.toLowerCase();
    };

    useEffect(() => {
        // Fetch initial weather data for a default city
    }, [weatherData]);

    return (
        <WeatherDataContext.Provider value={{ weatherData, loading, bgImg, error, setError, fetchWeather }}>
            {children}
        </WeatherDataContext.Provider>
    );
};
