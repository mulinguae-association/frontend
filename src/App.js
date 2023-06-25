
import './App.scss';
import { Routes, Route } from "react-router-dom"
import Home from './components/HomePage/Home';
import About from './components/AboutPage/About';
import Register from './components/RegisterPage/Register';
import Navbar from './components/Navbar/Navbar';
import Loader from './components/Loader/Loader'
import useLoader from './components/Loader/useLoader';
import NOtFound from "./components/NotFound/NotFound"
import ToTopBtn from "./components/ToTopBtn/ToTopBtn";
import PagesDetails from './components/Navbar/NavLinks/NestedNavLinks/PagesDetails';
import { useEffect, useState } from 'react';
function App() {
  const isLoading = useLoader()
  const [imgAnimation, setImgAnimation] = useState(false);
  useEffect(() => {
    setImgAnimation(true);
  }, []);
  return (
    <div className="App">
      <Navbar />
      {isLoading ? <Loader /> :
        <Routes>
          <Route exact path="/" element={<Home imgAnimation={imgAnimation} />} />
          <Route exact path='/About' element={<About />} />
          <Route exact path='/Register' element={<Register />} />
          <Route path='/pages/:pageId' element={<PagesDetails />} />
          <Route path='*' element={<NOtFound />} />
        </Routes>
      }
      <ToTopBtn />
    </div>
  );
}

export default App;


