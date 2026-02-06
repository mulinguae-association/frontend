import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Loader from "./Loader";
import useLoader from "./Loader/useLoader";
import { ToastContainer } from "react-toastify";
const ScrollToTop = React.lazy(() => import("../utils/ScrollToTop"));
const ToTopBtn = React.lazy(() => import("../components/ToTopBtn"));
const Footer = React.lazy(() => import("./FooterPages/index"));

const Layout = () => {
  const location = useLocation();
  const isAppLoading = useLoader();
  const [toastifyLoaded, setToastifyLoaded] = useState(false);

  const pathname = location.pathname.replace(/^\/[^/]+/, "");

  const excludePath = !(
    pathname === "/home" ||
    pathname === "/user-settings" ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin/dashboard")
  );

  useEffect(() => {
    import("react-toastify/dist/ReactToastify.css").then(() => {
      setToastifyLoaded(true);
    });
  }, []);

  if (isAppLoading) return <Loader />;

  return (
    <>
      <Navbar />
      {toastifyLoaded && <ToastContainer />}
      {
        <>
          <React.Suspense fallback={<Loader />}>
            <Outlet />
            {excludePath && <Footer />}
          </React.Suspense>
          <React.Suspense>
            <ScrollToTop />
            <ToTopBtn />
          </React.Suspense>
        </>
      }
    </>
  );
};

export default Layout;
