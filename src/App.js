import './App.css';
import {useContext, useState, useEffect} from 'react';
import { WeatherDataProvider, WeatherDataContext } from './contexts/WeatherDataContext';
import CityAutocomplete from './components/CityAutocomplete';
import WindTempComponent from './components/WindTempComponent';
import AICityFunFacts from './components/AICityFunFacts';
import CurrentWeatherInfo from './components/CurrentWeatherInfo';
import WeatherForecast from './components/WeatherForecast';

const AppContent = () => {
  const { bgImg, weatherData } = useContext(WeatherDataContext);
  const [selectedCity, setSelectedCity] = useState('');
  const [showMain, setShowMain] = useState(false);
  const [showAside, setShowAside] = useState(false);

  useEffect(() => {
    if (weatherData) {
      setTimeout(() => setShowAside(true), 1000); // Adjust delay as needed
      setTimeout(() => setShowMain(true), 1500); // Adjust delay as needed
    } else {
      setShowAside(false);
      setShowMain(false);
    }
  }, [weatherData]);

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
        <div className={showAside ? 'asideContent show' : 'asideContent hide'}>
          <WindTempComponent weatherData={weatherData}/>
          <AICityFunFacts city={selectedCity}/>
        </div>
      </aside>
      <main className={showMain ? 'show' : 'hide'}>
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
