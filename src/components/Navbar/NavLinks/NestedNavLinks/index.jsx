import React, { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./NestedNavLinks.scss";
import { useTranslation } from "react-i18next";
import { BsCurrencyExchange } from "react-icons/bs";
const NestedNavLinks = (props) => {
  const { t } = useTranslation("pages/pagesLinks");
  const NestedLinksRef = useRef(null);
  const location = useLocation();

  const handleClickOutside = (event) => {
    if (
      NestedLinksRef.current &&
      !NestedLinksRef.current.contains(event.target) &&
      !NestedLinksRef.current.parentNode.contains(event.target)
    ) {
      props.setIsCurrElement(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });
  return (
    <div ref={NestedLinksRef} className="nestedNavLinks">
      <ul className="nestedNavContainer">
        <li>
          <NavLink
            to={`pages/multilingualism`}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {t("Multilingualism")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`pages/linguicide`}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {t("Linguicide")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`pages/teachers`}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {t("Teachers")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`pages/teachers#meetOurTeachers`}
            relative="path"
            className={() =>
              location.hash === "#meetOurTeachers" ? "active" : ""
            }
          >
            {t("Meet our teachers")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`pages/students`}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {t("Students")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`pages/blogs`}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {t("Blogs")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`pages/libraries`}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            All Libraries
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`pages/100-basic-phrases/`}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {t("100 basic phrases")}
          </NavLink>
        </li>
        <li className="donation_link">
          <NavLink
            to={`pages/donations`}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <BsCurrencyExchange /> {t("donate")}
          </NavLink>
        </li>
      </ul>
      <img
        className="book_list"
        src="/images/icons/BooksList.png"
        alt="BooksList"
      />
    </div>
  );
};

export default NestedNavLinks;
