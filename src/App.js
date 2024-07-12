import './App.css';
import {useContext, useState} from 'react';
import { WeatherDataProvider, WeatherDataContext } from './contexts/WeatherDataContext';
import CityAutocomplete from './components/CityAutocomplete';
import WindTempComponent from './components/WindTempComponent';
import AICityFunFacts from './components/AICityFunFacts';
import CurrentWeatherInfo from './components/CurrentWeatherInfo';
import WeatherForecast from './components/WeatherForecast';

const AppContent = () => {
  const { bgImg, weatherData } = useContext(WeatherDataContext);
  const [selectedCity, setSelectedCity] = useState('');

  return (
    <div className="App"
      style={{
        backgroundImage: `url("/img/backgrounds/${bgImg}.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%', 
        minHeight: '100vh', 
        width: '100%'
      }}>
      <div className="overlay"></div>
      <aside>
        <CityAutocomplete onCitySelect={setSelectedCity}/>
        <WindTempComponent weatherData={weatherData}/>
        <AICityFunFacts city={selectedCity}/>
      </aside>
      <main>
        { weatherData &&
          <>
            <div className="container">
              <h2>INTERNATIONAL<br/>WEATHER</h2>
            </div>
            < CurrentWeatherInfo weatherData={weatherData}/>
            < WeatherForecast weatherData={weatherData}/>
          </>
        } 
      </main>
    </div>
  );
};

const App = () => (
  <WeatherDataProvider>
    <AppContent />
  </WeatherDataProvider>
);

export default App;
