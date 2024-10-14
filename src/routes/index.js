import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import React from "react";
import ProtectedRoute from "./ProtectedRoute";

const Teachers = React.lazy(() => import("../components/pages/Teachers"));
const Students = React.lazy(() => import("../components/pages/Students"));
const Multilingualism = React.lazy(() => import("../components/pages/Multilingualism"));
const Linguicide = React.lazy(() => import("../components/pages/Linguicide"));
const Blogs = React.lazy(() => import("../components/pages/Blogs"));
const HundredPhrases = React.lazy(() => import("../components/pages/hundredPhrases"));
const Donation = React.lazy(() => import("../components/pages/Donations"));
const FeedBack = React.lazy(() => import("../components/pages/FeedBack"));
const EducationForAll = React.lazy(() => import("../components/pages/EducationForAll"));
const AllStudetns = React.lazy(() => import("../components/pages/AllStudents"));
const Home = React.lazy(() => import("../components/HomePage"));
const LazyAbout = React.lazy(() => import("../components/AboutPage"));
const TeacherProfile = React.lazy(() => import("../components/pages/Teachers/TeacherProfile"));
const CreateBlog = React.lazy(() => import("../components/pages/Blogs/CreateBlog"));
const Register = React.lazy(() => import("../components/AuthPages/Register"));
const Login = React.lazy(() => import("../components/AuthPages/Login"));
const ForgotPassword = React.lazy(() => import("../components/AuthPages/ForgotPassword"));
const ResetPassword = React.lazy(() => import("../components/AuthPages/ResetPassword"));
const UserSettings = React.lazy(() => import("../components/AuthPages/UserSettings"));
const Dashboard = React.lazy(() => import("../components/Dashboard"));
const PagesLayout = React.lazy(() => import("../components/pages/PagesLayout"));
const Courses = React.lazy(() => import("../components/CoursesPage"));
const Contact = React.lazy(() => import("../components/ContactPage"));
const PrivacyPolicy = React.lazy(() => import("../components/Privacy&terms/PrivacyPolicy"));
const NotFound = React.lazy(() => import("../components/NotFound"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="en/" />
  },
  {

    path: ":lng/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "about",
        element: <LazyAbout />
      },
      {
        path: "pages",
        element: <PagesLayout />,
        children: [

          {
            path: "multilingualism",
            element: <Multilingualism />
          },
          {
            path: "linguicide",
            element: <Linguicide />
          },
          {
            path: "teachers",
            element: <Teachers />
          },
          {
            path: "students",
            element: <Students />
          },
          {
            path: "blogs",
            element: <Blogs />
          },
          {
            path: "100-basic-phrases",
            element: <HundredPhrases />
          },
          {
            path: "donations",
            element: <Donation />
          },
          {
            path: "feedback",
            element: <FeedBack />
          },
          {
            path: "education-for-all",
            element: <EducationForAll />
          },
          {
            path: "students-of-all-ages",
            element: <AllStudetns />
          }
        ]
      },
      {
        path: "pages/teachers/:teacherId",
        element: <TeacherProfile />
      },
      {
        path: "pages/blogs/create-new-blog",
        element:
          <ProtectedRoute>
            <CreateBlog />
          </ProtectedRoute>
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />
      },
      {
        path: "reset/:id/:token",
        element: <ResetPassword />
      },
      {
        path: "user-settings",
        element: <UserSettings />
      },
      {
        path: "dashboard",
        element:
          <ProtectedRoute isAdmin={true}>
            <Dashboard />
          </ProtectedRoute>
      },
      {
        path: "courses",
        element: <Courses />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
])

export default router;