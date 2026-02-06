import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Sidebar from "../Sidebar";
import "./Dashboard.scss";
import {
  FaHome,
  FaUserFriends,
  FaBook,
  FaCog,
  FaPlus,
  FaShieldAlt,
} from "react-icons/fa";

const adminLinks = [
  { to: "admin/dashboard", label: "Admin Home", icon: <FaHome /> },
  {
    to: "admin/dashboard/users",
    label: "Manage Users",
    icon: <FaUserFriends />,
  },
  { to: "admin/dashboard/posts", label: "Manage Posts", icon: <FaBook /> },
  // Add more admin links here
];

const adminSections = [
  {
    title: "Teachers",
    links: [
      {
        to: "/admin/dashboard/teachers/new",
        label: "New Teacher",
        icon: <FaPlus />,
      },
    ],
  },
  {
    title: "Blogs",
    links: [
      {
        to: "/admin/dashboard/blogs/moderation",
        label: "Moderate Blogs",
        icon: <FaShieldAlt />,
      },
    ],
  },
];

const userLinks = [
  { to: "/dashboard", label: "Dashboard Home", icon: <FaHome /> },
  { to: "/dashboard/my-posts", label: "My Posts", icon: <FaBook /> },
  { to: "/dashboard/settings", label: "Settings", icon: <FaCog /> },
  // Add more user links here
];

const Dashboard = () => {
  const { userData } = useAuth();
  const isAdmin = userData?.role === "admin";
  const location = useLocation();

  // Helper to flatten all links for easy matching
  const flattenLinks = (links, sections) => [
    ...(links || []),
    ...(sections || []).flatMap((s) => s.links),
  ];

  const allLinks = isAdmin
    ? flattenLinks(adminLinks, adminSections)
    : flattenLinks(userLinks, []);

  // Find the label of the current route
  const currentPath = location.pathname.replace(/^\/[a-z]{2}\//, "/");
  const activeLink = allLinks.find((l) =>
    currentPath.endsWith(l.to.replace(/^\/[a-z]{2}\//, "/")),
  );
  const activeLabel = activeLink ? activeLink.label : "Dashboard";

  // Sidebar open/close state for mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="dashboard">
      {isAdmin ? (
        <Sidebar
          links={adminLinks}
          sections={adminSections}
          className={sidebarOpen ? "open" : ""}
        />
      ) : (
        <Sidebar links={userLinks} className={sidebarOpen ? "open" : ""} />
      )}
      <main className="dashboard-content">
        <div className="container">
          <header className="dashboard-header">
            <button
              className="dashboard-sidebar-toggle"
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
              onClick={handleSidebarToggle}
            >
              <span className="dashboard-sidebar-arrow">
                {!sidebarOpen ? "»" : "«"}
              </span>
            </button>
            <h2 className="dashboard-page-title">{activeLabel}</h2>
          </header>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
