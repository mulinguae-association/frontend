import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";
import { notifyError, notifySuccess } from "../../Notify";
import { useAuth } from "../../../contexts/AuthContext.jsx";
import i18next from "i18next";
import SearchBar from "./SearchBar";
import logError from "../../../utils/logError";
import { useQueryClient } from "react-query";
import handleError from "../../../utils/handleError";
import { useTranslation } from "react-i18next";
import { BiLoaderCircle, BiPlusCircle } from "react-icons/bi";
const UserMenu = React.lazy(() => import("./UserMenu"));

const BlogsHeader = ({
  searchQuery,
  handleSearchChange,
  handleSearchKeyPress,
  hideSearch = false,
  hideCreateBlog = false,
  style = {},
}) => {
  const { userData, isAuth, setIsAuth } = useAuth();
  const [showUserMenu, setShowMenuUser] = useState(false);
  const queryClient = useQueryClient();
  const { t, i18n } = useTranslation("pages/blogs");
  const isAr_Ur = ["ar", "ur"].includes(i18n.language);
  const handleLogout = async () => {
    const { submitLogout } = await import("../../../apis/auth-api");
    try {
      const res = await submitLogout();
      notifySuccess(res.data);
      // Update the authentication status to reflect the logout.
      setIsAuth(false);
      await queryClient.resetQueries("userProfile");
      setShowMenuUser(false);
    } catch (err) {
      logError(err);
      notifyError(handleError(err));
    }
  };

  return (
    <div className="blogs_header" style={style}>
      <div className="links button-font">
        {!hideCreateBlog && (
          <Link
            to={`/${i18n.language}/pages/blogs/create-new-blog`}
            className="create-blog-link"
          >
            <BiPlusCircle
              style={{ verticalAlign: "middle", marginRight: 6, fontSize: 22 }}
            />
            {t("createABlog.name")} {t("createABlog.special")}
          </Link>
        )}
        {!hideSearch && (
          <div className="search_bar_container">
            <SearchBar
              className={"bgSC"}
              id="search-input-bigSC"
              searchQuery={searchQuery}
              handleSearchChange={handleSearchChange}
              onKeyDown={handleSearchKeyPress}
            />
          </div>
        )}
        {isAuth ? (
          <div className="user_info">
            <div
              className="img_container"
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                width="150px"
                height="150px"
                src={
                  userData?.profileImage
                    ? userData.profileImage
                    : "/images/fallBackUser.png"
                }
                alt="user_image"
                onError={(e) => (e.target.src = "/images/fallBackUser.png")}
                loading="lazy"
              />
            </div>
            <div
              onClick={() => setShowMenuUser((prev) => !prev)}
              className="text_info"
            >
              <h2>{userData?.name}</h2>
              <span>
                <IoMdArrowDropdown size={20} />
              </span>
            </div>
            {showUserMenu && (
              <React.Suspense
                fallback={
                  <span
                    className="user_menu"
                    style={
                      isAr_Ur
                        ? { left: 0, right: "unset" }
                        : { right: 0, left: "unset" }
                    }
                  >
                    <BiLoaderCircle className="spin-loader" />
                  </span>
                }
              >
                <UserMenu
                  handleLogout={handleLogout}
                  setShowMenuUser={setShowMenuUser}
                />
              </React.Suspense>
            )}
          </div>
        ) : (
          <div className="auth_Links">
            <Link to={`/${i18next.language}/login`}>{t("Auth.login")}</Link>
            <Link to={`/${i18next.language}/Register`}>
              {t("Auth.register")}
            </Link>
          </div>
        )}
      </div>
      <div className="search_bar_container">
        <SearchBar
          className={"smSC"}
          id="search-input-smallSC"
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          onKeyDown={handleSearchKeyPress}
        />
      </div>
    </div>
  );
};

export default BlogsHeader;
