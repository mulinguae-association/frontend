import './App.scss';
import { Routes, Route } from "react-router-dom"
import Home from './components/HomePage/Home';
import About from './components/AboutPage/About';
import Register from './components/RegisterPage/Register';
import Navbar from './components/Navbar/Navbar';
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path='/About' element={<About />} />
        <Route exact path='/Register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
