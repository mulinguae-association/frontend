import "./App.scss";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
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
import { useCookies } from 'react-cookie';
import i18n from "./i18n";
import Courses from "./components/CoursesPage";

const Home = React.lazy(() => import("./components/HomePage"));
const LazyAbout = React.lazy(() => import("./components/AboutPage"));
const TeacherProfile = React.lazy(() => import("./components/pages/Teachers/TeacherProfile"));
const CreateBlog = React.lazy(() => import("./components/pages/Blogs/CreateBlog"));
const Dashboard = React.lazy(() => import("./components/Dashboard"));
const NotFound = React.lazy(() => import("./components/NotFound"));
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true
function App() {
	const isLoading = useLoader();
	const [imgAnimation, setImgAnimation] = useState(false);
	const [, setCookie] = useCookies(['selectedLanguage'])

	const location = useLocation();
	const lang = location.pathname.split("/")[1];

	useEffect(() => {
		i18n.changeLanguage(lang);
		setCookie('selectedLanguage', lang);
	}, [lang, setCookie]);

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
						<Route path="/" element={<Navigate to="/En" />} />
						<Route
							exact
							path=':lang/'
							element={<Home imgAnimation={imgAnimation} />}
						/>
						<Route path=':lang/About' element={<LazyAbout />} />
						<Route path=':lang/Register' element={<Register />} />
						<Route path=':lang/Login' element={<Login />} />
						<Route path=':lang/pages/:pageId' element={<PagesDetails />} />
						<Route path=':lang/pages/teachers/:teacherId' element={<TeacherProfile />} />
						<Route path=':lang/pages/Blogs/create-new-blog' element={
							<ProtectedRoute >
								<CreateBlog />
							</ProtectedRoute>
						} />
						<Route path=':lang/dashboard' element={
							<ProtectedRoute isAdmin={true}>
								<Dashboard />
							</ProtectedRoute>
						} />
						<Route path=":lang/forgot-password" element={<ForgotPassword />} />
						<Route path=":lang/reset/:id/:token" element={<ResetPassword />} />
						<Route path=":lang/user/settings" element={<UserSettings />} />
						<Route path=":lang/courses" element={<Courses />} />
						<Route path='*' element={<NotFound />} />
					</Routes >
				</React.Suspense >
			)
			}
			<ToTopBtn />
		</div >
	);
}

export default App;
