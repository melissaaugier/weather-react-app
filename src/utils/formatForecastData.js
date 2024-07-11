import {convertUnixToReadableDayDate} from './timeUtils';

export const formatForecastData = (weatherData) => {
    const forecast = [];

    // Start iteration from index 1 to exclude the first element
    for (let i = 1; i < weatherData.length; i++) {
        forecast.push({
            date: convertUnixToReadableDayDate(weatherData[i].dt),
            minTemp: (weatherData[i].main.temp_min - 3).toFixed(1),
            maxTemp: (weatherData[i].main.temp_max).toFixed(1),
            temp: (weatherData[i].main.temp).toFixed(0)
        });
    }

    return forecast;
};