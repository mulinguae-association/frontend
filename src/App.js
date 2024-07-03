import "./App.scss";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import React, { useContext, useEffect, useState } from "react";
import ToTopBtn from "./components/ToTopBtn";
import axios from "axios";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useCookies } from 'react-cookie';
import i18n from "./i18n";
import ScrollToTop from "./utils/ScrollToTop";
import { AppContext } from "./contexts/AppContext";

const Home = React.lazy(() => import("./components/HomePage"));
const LazyAbout = React.lazy(() => import("./components/AboutPage"));
const TeacherProfile = React.lazy(() => import("./components/pages/Teachers/TeacherProfile"));
const CreateBlog = React.lazy(() => import("./components/pages/Blogs/CreateBlog"));
const Register = React.lazy(() => import("./components/AuthPages/Register"));
const Login = React.lazy(() => import("./components/AuthPages/Login"));
const ForgotPassword = React.lazy(() => import("./components/AuthPages/ForgotPassword"));
const ResetPassword = React.lazy(() => import("./components/AuthPages/ResetPassword"));
const UserSettings = React.lazy(() => import("./components/AuthPages/UserSettings"));
const Dashboard = React.lazy(() => import("./components/Dashboard"));
const PagesDetails = React.lazy(() => import("./components/Navbar/NavLinks/NestedNavLinks/PagesDetails"));
const Courses = React.lazy(() => import("./components/CoursesPage"));
const Contact = React.lazy(() => import("./components/ContactPage"));
const PrivacyPolicy = React.lazy(() => import("./components/Privacy&terms/PrivacyPolicy"));
const NotFound = React.lazy(() => import("./components/NotFound"));
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true
function App() {
	const { isLoading, setIsLoading } = useContext(AppContext);

	const [imgAnimation, setImgAnimation] = useState(false);
	const [, setCookie] = useCookies(['selectedLanguage'])

	const location = useLocation();
	const lang = location.pathname.split("/")[1];

	useEffect(() => {
		setIsLoading(true);
		i18n.changeLanguage(lang, () => setIsLoading(false));
		setCookie('selectedLanguage', lang);
	}, [lang, setCookie, setIsLoading]);

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
					<ScrollToTop />
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
						<Route path=':lang/contact' element={<Contact />} />
						<Route path=":lang/privacy-policy" element={<PrivacyPolicy />} />
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
