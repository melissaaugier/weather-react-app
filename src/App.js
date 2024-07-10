import './App.css';
import {useContext, useState} from 'react';
import { WeatherDataProvider, WeatherDataContext } from './contexts/WeatherDataContext';
import CityAutocomplete from './components/CityAutocomplete';
import WindTempComponent from './components/WindTempComponent';
import AICityFunFacts from './components/AICityFunFacts';

const AppContent = () => {
  const { bgImg } = useContext(WeatherDataContext);
  const [selectedCity, setSelectedCity] = useState('');

  return (
    <div className="App"
      style={{
        backgroundImage: `url("/img/backgrounds/${bgImg}.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%', 
        minHeight: '100vh', 
      }}>
      <aside>
        <CityAutocomplete onCitySelect={setSelectedCity}/>
        <WindTempComponent />
        <AICityFunFacts city={selectedCity}/>
      </aside>
    </div>
  );
};

const App = () => (
  <WeatherDataProvider>
    <AppContent />
  </WeatherDataProvider>
);

export default App;
