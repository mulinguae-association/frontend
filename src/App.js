import './App.css';
import { Routes, Route } from "react-router-dom"
import Home from './components/HomePage/Home';
import About from './components/AboutPage/About';
import Register from './components/RegisterPage/Register';
import LanguageSwitcher from './components/LanguageSwitcher';
function App() {
  return (
    <div className="App">
      <h1 >Hello <span style={{ color: "#3485ff" }}>khisnasamy</span></h1>
      <LanguageSwitcher />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path='/About' element={<About />} />
        <Route exact path='/Register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
