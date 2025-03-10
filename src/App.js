import logo from './logo.svg';
import './App.css'
import AdditionalInfo from './components/AdditionalInfo';
import FiveDayForecast from './components/FiveDayForecast';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import SearchBar from './components/SearchBar';
function App() {
  return (
    <div className="App">
      <SearchBar/>
      <CurrentWeather/>
      <HourlyForecast/>
      <FiveDayForecast/>
      <AdditionalInfo />
    </div>
  );
}

export default App;
