import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Register from "./components/RegisterPage/Register";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import useLoader from "./components/Loader/useLoader";
import React, { useEffect, useState } from "react";
import PagesDetails from "./components/Navbar/NavLinks/NestedNavLinks/PagesDetails";
import ToTopBtn from "./components/ToTopBtn";
const Home = React.lazy(() => import("./components/HomePage"));
const LazyAbout = React.lazy(() => import("./components/AboutPage"));
const TeacherProfile = React.lazy(() => import("./components/pages/Teachers"));
const Dashboard = React.lazy(() => import("./components/Dashboard"));
const NotFound = React.lazy(() => import("./components/NotFound"));

function App() {
	const isLoading = useLoader();
	const [imgAnimation, setImgAnimation] = useState(false);
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
						<Route path='/About' element={<LazyAbout />} />
						<Route path='/Register' element={<Register />} />
						<Route path='/pages/:pageId' element={<PagesDetails />} />
						<Route path='/pages/teachers/:teacherId' element={<TeacherProfile />} />
						<Route path='/dashboard' element={<Dashboard />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</React.Suspense>
			)}
			<ToTopBtn />
		</div>
	);
}

export default App;
