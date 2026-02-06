import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import "./Sidebar.scss";
import i18n from "../../../i18n";
import { Link } from "react-router-dom";
import useWindowResize from "../../../hooks/useWindowResize";
import { useClickOutside } from "../../../utils/ClickOutside";
import {
  FaHome,
  FaUserFriends,
  FaCog,
  FaBook,
  FaPlus,
  FaShieldAlt,
} from "react-icons/fa";

const iconMap = {
  home: <FaHome />,
  users: <FaUserFriends />,
  settings: <FaCog />,
  posts: <FaBook />,
  add: <FaPlus />,
  moderate: <FaShieldAlt />,
};

const Sidebar = ({
  links = [],
  className = "",
  collapsedWidth = 60,
  expandedWidth = 220,
  defaultCollapsed = false,
  sections = [],
}) => {
  const MOBILE_BREAKPOINT = 991;
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const { width } = useWindowResize();
  const isMobile = width < MOBILE_BREAKPOINT;
  const sidebarRef = useRef(null);

  useClickOutside(sidebarRef, () => {
    // if (isMobile && !collapsed) {
    setCollapsed(true);
    // }
  }, [isMobile, collapsed]);

  React.useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    } else {
      setCollapsed(defaultCollapsed);
    }
  }, [isMobile, defaultCollapsed]);

  const hasSections = Array.isArray(sections) && sections.length > 0;
  const hasLinks = Array.isArray(links) && links.length > 0;

  return (
    <aside
      ref={sidebarRef}
      className={`reusable-sidebar${collapsed ? " collapsed" : ""} ${className}`}
      style={
        isMobile
          ? undefined
          : { width: collapsed ? collapsedWidth : expandedWidth }
      }
    >
      <button
        className="sidebar__toggle"
        onClick={() => setCollapsed((prev) => !prev)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? "»" : "«"}
      </button>
      <nav className="sidebar__nav">
        {hasLinks && (
          <ul>
            {links.map(({ to, icon, label }) => (
              <li key={to} className="sidebar__item">
                <a href={`/${i18n.language}/${to}`} className="sidebar__link">
                  <span className="sidebar__icon">
                    {typeof icon === "string" ? iconMap[icon] : icon}
                  </span>
                  {!collapsed && (
                    <span className="sidebar__label">{label}</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        )}
        {hasSections &&
          sections.map((section, idx) => (
            <div className="sidebar__section" key={section.title || idx}>
              {!collapsed && section.title && (
                <div className="sidebar__section-title">{section.title}</div>
              )}
              <ul>
                {section.links.map(({ to, icon, label }) => (
                  <li key={to} className="sidebar__item">
                    <Link
                      to={`/${i18n.language}${to}`}
                      className="sidebar__link"
                    >
                      <span className="sidebar__icon">
                        {typeof icon === "string" ? iconMap[icon] : icon}
                      </span>
                      {!collapsed && (
                        <span className="sidebar__label">{label}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </nav>
    </aside>
  );
};

Sidebar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      icon: PropTypes.node,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  collapsedWidth: PropTypes.number,
  expandedWidth: PropTypes.number,
  defaultCollapsed: PropTypes.bool,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      links: PropTypes.arrayOf(
        PropTypes.shape({
          to: PropTypes.string.isRequired,
          icon: PropTypes.node,
          label: PropTypes.string.isRequired,
        }),
      ),
    }),
  ),
};

export default Sidebar;
