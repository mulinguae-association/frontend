import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import React from "react";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { BlogPostsProvider } from "../contexts/BlogsContext.jsx";

const Teachers = React.lazy(() => import("../components/pages/Teachers"));
const Students = React.lazy(
  () => import("../components/pages/Students/index.jsx"),
);
const Multilingualism = React.lazy(
  () => import("../components/pages/Multilingualism/index.jsx"),
);
const Linguicide = React.lazy(
  () => import("../components/pages/Linguicide/index.jsx"),
);
const Blogs = React.lazy(() => import("../components/pages/Blogs/index.jsx"));
const Libraries = React.lazy(
  () => import("../components/pages/Libraries/index.jsx"),
);
const HundredPhrases = React.lazy(
  () => import("../components/pages/hundredPhrases/index.jsx"),
);
const Donation = React.lazy(
  () => import("../components/pages/Donations/index.jsx"),
);
const FeedBack = React.lazy(
  () => import("../components/pages/FeedBack/index.jsx"),
);
const EducationForAll = React.lazy(
  () => import("../components/pages/EducationForAll/index.jsx"),
);
const AllStudetns = React.lazy(
  () => import("../components/pages/AllStudents/index.jsx"),
);
const Home = React.lazy(() => import("../components/HomePage/index.jsx"));
const LazyAbout = React.lazy(() => import("../components/AboutPage/index.jsx"));
const TeacherProfile = React.lazy(
  () => import("../components/pages/Teachers/TeacherProfile.jsx"),
);
const CreateBlog = React.lazy(
  () => import("../components/pages/Blogs/CreateBlog.jsx"),
);
// Correctly import auth pages using React.lazy
const Register = React.lazy(
  () => import("../components/AuthPages/pages/Register.jsx"),
);
const Login = React.lazy(
  () => import("../components/AuthPages/pages/Login.jsx"),
);
const ForgotPassword = React.lazy(
  () => import("../components/AuthPages/pages/ForgotPassword.jsx"),
);
const ResetPassword = React.lazy(
  () => import("../components/AuthPages/pages/ResetPassword.jsx"),
);
const UserSettings = React.lazy(
  () => import("../components/AuthPages/pages/UserSettings.jsx"),
);
const Dashboard = React.lazy(() => import("../components/Dashboard"));
const PagesLayout = React.lazy(
  () => import("../components/pages/PagesLayout.jsx"),
);
const Courses = React.lazy(() => import("../components/CoursesPage/index.jsx"));
const Contact = React.lazy(() => import("../components/ContactPage/index.jsx"));
const PrivacyPolicy = React.lazy(
  () => import("../components/Privacy&terms/PrivacyPolicy.jsx"),
);
const UnityAndSolidarity = React.lazy(
  () => import("../components/pages/unity&solidarity/index.jsx"),
);
const WorkWithUs = React.lazy(
  () => import("../components/pages/WorkWithUs/index.jsx"),
);
const BecomeTeacher = React.lazy(
  () => import("../components/pages/WorkWithUs/BecomeTeacher.jsx"),
);
const NotFound = React.lazy(() => import("../components/NotFound/index.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="en/" />,
  },
  {
    path: ":lng/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <LazyAbout />,
      },
      {
        path: "pages",
        element: <PagesLayout />,
        children: [
          {
            path: "multilingualism",
            element: <Multilingualism />,
          },
          {
            path: "linguicide",
            element: <Linguicide />,
          },
          {
            path: "teachers",
            element: <Teachers />,
          },
          {
            path: "students",
            element: <Students />,
          },
          {
            path: "blogs",
            element: (
              <BlogPostsProvider>
                <Blogs />
              </BlogPostsProvider>
            ),
          },
          {
            path: "libraries",
            element: <Libraries />,
          },
          {
            path: "100-basic-phrases",
            element: <HundredPhrases />,
          },
          {
            path: "donations",
            element: <Donation />,
          },
          {
            path: "feedback",
            element: <FeedBack />,
          },
          {
            path: "education-for-all",
            element: <EducationForAll />,
          },
          {
            path: "students-of-all-ages",
            element: <AllStudetns />,
          },
          {
            path: "unity-solidarity",
            element: <UnityAndSolidarity />,
          },
          {
            path: "work-with-us",
            element: <WorkWithUs />,
          },
          {
            path: "work-with-us/become-teacher",
            element: <BecomeTeacher />,
          },
        ],
      },
      {
        path: "pages/teachers/:teacherId",
        element: <TeacherProfile />,
      },
      {
        path: "pages/blogs/create-new-blog",
        element: (
          <ProtectedRoute>
            <BlogPostsProvider>
              <CreateBlog />
            </BlogPostsProvider>
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset/:id/:token",
        element: <ResetPassword />,
      },
      {
        path: "user-settings",
        element: (
          <BlogPostsProvider>
            <UserSettings />
          </BlogPostsProvider>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute isAdmin={true}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "courses",
        element: <Courses />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
