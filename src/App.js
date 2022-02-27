//import logo from './logo.svg';
//import './App.css';
import Header from './components/Header';
import Search from './components/Search';


function App() {
  return (
    <div className="App">
      <div><Header /></div>
      <br />
      <div><Search /></div>
      <br />
      <div id="result"></div>
    </div>
  );
}

export default App;
