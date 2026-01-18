import React from "react";
import { Link } from "react-router-dom";
import { useClickOutside } from "../../../utils/ClickOutside";
import { useAuth } from "../../../contexts/AuthContext.jsx";
import i18next from "i18next";
import i18n from "../../../i18n";
import { useTranslation } from "react-i18next";

const UserMenu = ({ handleLogout, setShowMenuUser }) => {
  const { isAuth, userData } = useAuth();
  const { t } = useTranslation("pages/blogs");
  const isAr_Ur = ["ar", "ur"].includes(i18n.language);
  const userMenu = useClickOutside(() => {
    setShowMenuUser(null);
  });
  return (
    <div
      ref={userMenu}
      className="user_menu"
      style={
        isAr_Ur ? { left: 0, right: "unset" } : { right: 0, left: "unset" }
      }
    >
      {isAuth && userData.role === "admin" && (
        <Link to={`/${i18next.language}/dashboard`} className="user-link">
          {t("dashBtn")}
        </Link>
      )}
      <Link to={`/${i18next.language}/user-settings`} className="user-link">
        {t("settingsBtn")}
      </Link>
      <button onClick={handleLogout} className="logout-button">
        {t("logoutBtn")}
      </button>
    </div>
  );
};

export default UserMenu;
