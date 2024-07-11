
import {convertUnixToReadableDate} from './timeUtils';

export const formatRainfallData = (weatherData, timezoneOffset) => {
    const forecast = weatherData.list;
    const rainfallData = [];
    
    forecast.forEach((day) => {
        let formatDay = convertUnixToReadableDate(day.dt, timezoneOffset);
        let formatRainfall = ("rain" in day) ? day["rain"]["3h"] : 0 ;
        rainfallData.push({ day: formatDay, rainfall: formatRainfall })
    });

    return rainfallData;
};