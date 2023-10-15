import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Register from "./components/AuthPages/Register";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import useLoader from "./components/Loader/useLoader";
import React, { useEffect, useState } from "react";
import PagesDetails from "./components/Navbar/NavLinks/NestedNavLinks/PagesDetails";
import ToTopBtn from "./components/ToTopBtn";
import axios from "axios";
import Login from "./components/AuthPages/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import ForgotPassword from "./components/AuthPages/ForgotPassword";
import ResetPassword from "./components/AuthPages/ResetPassword";
import UserSettings from "./components/AuthPages/UserSettings";

const Home = React.lazy(() => import("./components/HomePage"));
const LazyAbout = React.lazy(() => import("./components/AboutPage"));
const TeacherProfile = React.lazy(() => import("./components/pages/Teachers/TeacherProfile"));
const CreateBlog = React.lazy(() => import("./components/pages/Blogs/CreateBlog"));
const Dashboard = React.lazy(() => import("./components/Dashboard"));
const NotFound = React.lazy(() => import("./components/NotFound"));
axios.defaults.baseURL = 'https://mulinguabackend-production.up.railway.app/';
axios.defaults.withCredentials = true
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
						<Route path='/Login' element={<Login />} />
						<Route path='/pages/:pageId' element={<PagesDetails />} />
						<Route path='/pages/teachers/:teacherId' element={<TeacherProfile />} />
						<Route path='/pages/Blogs/create-new-blog' element={
							<ProtectedRoute >
								<CreateBlog />
							</ProtectedRoute>
						} />
						<Route path='/dashboard' element={
							<ProtectedRoute isAdmin={true}>
								<Dashboard />
							</ProtectedRoute>
						} />
						<Route path="/forgot-password" element={<ForgotPassword />} />
						<Route path="/reset/:id/:token" element={<ResetPassword />} />
						<Route path="/user/settings" element={<UserSettings />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</React.Suspense>
			)}
			<ToTopBtn />
		</div>
	);
}

export default App;
