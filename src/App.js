//import logo from './logo.svg';
//import './App.css';
import Result from './components/Result';
import Search from './components/Search';
import './css/header.css';

function App() {

  const appCSS = {
    margin: "5% 20% 40%"
  }

  return (
    <div className="App" style={appCSS}>

      <div className="header" >
        <img src="./medic_logo.png" />
        <a href="www.temedica.com">Temedica</a>
      </div>

      <Search />

      <div id="result" />
        {/* <Result></Result> */}
    </div>
  );
}

export default App;
