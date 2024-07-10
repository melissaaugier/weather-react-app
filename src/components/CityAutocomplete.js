import React, { useState, useContext } from 'react';
import { WeatherDataContext } from '../contexts/WeatherDataContext';
import SearchIcon from '../icons/searchIcon';
import ThermometerIcon from '../icons/thermometerIcon';
import './CityAutocomplete.css';

const apiKey = process.env.REACT_APP_KEY_LOCATIONIQ; 
const apiUrlBase = `https://api.locationiq.com/v1/autocomplete?key=${apiKey}&accept-language=en&limit=4&normalizecity=1`;

const CityAutocomplete = ({onCitySelect}) => {
    const { fetchWeather, loading, error, setError } = useContext(WeatherDataContext);
    const [city, setCity] = useState('');
    const [citiesLoading, setCitiesLoading] = useState(false);
    const [citiesError, setCitiesError] = useState(null);
    const [citySuggestions, setCitySuggestions] = useState([]);

    const fetchCitySuggestions = async(inputValue) => {
        setCity(inputValue);
        setCitySuggestions([]);
        setError(false);

        if (inputValue.length < 3) return;

        setCitiesError(false);
        setCitiesLoading(true);
        
        try {
            const apiUrl = `${apiUrlBase}&q=${inputValue}`;
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            const dataSuggested = data.map((citySuggestion) => {
                return (citySuggestion.display_name)
            });
            setCitySuggestions(dataSuggested)

        } catch(error) {
            console.error('Error fetching city suggestions data:', error);
            setCitiesError('No cities found ...');
            setCitySuggestions(null);
        } finally {
            setCitiesLoading(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeather(city);
        onCitySelect(city);
        setCitiesError(false);

    };

    const handleClick = (e) => {
        const selectedCity = e.target.value;
        setCity(selectedCity);
        setCitySuggestions(null);
        fetchWeather(selectedCity);
        onCitySelect(selectedCity);
    };

    return ( 
        <div>
            <form className='input-search' onSubmit={handleSubmit}>
                <ThermometerIcon />
                <input name='city-search' type='text' value={city} onChange={(e) => fetchCitySuggestions(e.target.value)} placeholder="Enter city name" />
                <button type="submit"><SearchIcon fillColor='#F3F3F3'/></button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {citiesLoading && <div className='citySuggestions warning'>Searching cities ...</div>}
            {citiesError && <div className='citySuggestions warning'>{citiesError}</div>}
            {citySuggestions && 
                <div className='citySuggestions'>
                    { citySuggestions.map((suggestion, index) => (
                        <input type="button" key={index} onClick={handleClick} value={suggestion} />
                    ))}
                </div>
            }
        </div>
    );
};

export default CityAutocomplete;
