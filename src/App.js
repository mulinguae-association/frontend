import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./components/HomePage/Home";
import Register from "./components/RegisterPage/Register";
import Navbar from "./components/Navbar/Navbar";
import Loader from "./components/Loader/Loader";
import useLoader from "./components/Loader/useLoader";
import NOtFound from "./components/NotFound/NotFound";
import ToTopBtn from "./components/ToTopBtn/ToTopBtn";
import React, { useEffect, useState } from "react";
function App() {
	const isLoading = useLoader();
	const [imgAnimation, setImgAnimation] = useState(false);
	const LazyAbout = React.lazy(() => import("./components/AboutPage/About"));
	const LazyPagesDetails = React.lazy(() =>
		import("./components/Navbar/NavLinks/NestedNavLinks/PagesDetails")
	);
	useEffect(() => {
		setImgAnimation(true);
	}, []);
	return (
		<div className='App'>
			<Navbar />
			{isLoading ? (
				<Loader />
			) : (
				<React.Suspense fallback={<Loader />}>
					<Routes>
						<Route
							exact
							path='/'
							element={<Home imgAnimation={imgAnimation} />}
						/>
						<Route exact path='/About' element={<LazyAbout />} />
						<Route exact path='/Register' element={<Register />} />
						<Route path='/pages/:pageId' element={<LazyPagesDetails />} />
						<Route path='*' element={<NOtFound />} />
					</Routes>
				</React.Suspense>
			)}
			<ToTopBtn />
		</div>
	);
}

export default App;
