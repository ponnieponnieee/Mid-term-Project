import logo from './logo.svg';
import './App.css'
import AdditionalInfo from './components/AdditionalInfo';
import FiveDayForecast from './components/FiveDayForecast';

function App() {
  return (
    <div className="App">
      <AdditionalInfo />
      <FiveDayForecast/>
    </div>
  );
}

export default App;
