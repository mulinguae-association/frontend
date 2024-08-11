import React, { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { submitLogout } from '../../../apis/auth-api';
import { notifyError, notifySuccess } from '../../Notify';
import { useAuth } from '../../../contexts/AuthContext';
import UserMenu from './UserMenu';
import i18next from 'i18next';
import SearchBar from './SearchBar';
import logError from '../../../utils/logError';
import { useQueryClient } from 'react-query';
import handleError from '../../../utils/handleError';
import { useTranslation } from 'react-i18next';

const BlogsHeader = ({ searchQuery, handleSearchChange, handleSearchKeyPress }) => {
  const { userData, isAuth, setIsAuth } = useAuth();
  const [showUserMenu, setShowMenuUser] = useState(false);
  const queryClient = useQueryClient();
  const { t } = useTranslation("pages/blogs");
  const handleLogout = async () => {
    try {
      const res = await submitLogout();
      notifySuccess(res.data);
      // Update the authentication status to reflect the logout.
      setIsAuth(false);
      await queryClient.resetQueries("userProfile")
      setShowMenuUser(false);
    } catch (err) {
      logError(err);
      notifyError(handleError(err));
    }
  };

  return (
    <div className='blogs_header'>
      <div className="links button-font">
        <Link to={`/${i18next.language}/pages/Blogs/Create-new-blog`}>{`+ ${t("createABlog.name")} ${t("createABlog.special")}`}</Link>
        <div className='search_bar_container'>
          <SearchBar
            className={"bgSC"}
            id="search-input-bigSC"
            searchQuery={searchQuery}
            handleSearchChange={handleSearchChange}
            onKeyDown={handleSearchKeyPress}
          />
        </div>
        {isAuth ? (
          <div className='user_info'>
            <div className="img_container">
              <img
                width="150px"
                height="150px"
                src={userData?.profileImage ? userData.profileImage : '/images/fallBackUser.png'}
                alt='user_image' onError={(e) => e.target.src = "/images/fallBackUser.png"}
                loading='lazy'
              />

            </div>
            <div onClick={() => (setShowMenuUser((prev) => !prev))} className='text_info'>
              <h2>{userData?.name}</h2>
              <span><IoMdArrowDropdown size={20} /></span>
            </div>
            {showUserMenu && <UserMenu handleLogout={handleLogout} setShowMenuUser={setShowMenuUser} />}
          </div>
        ) :
          <div className="auth_Links">
            <Link to={`/${i18next.language}/login`}>{t("Auth.login")}</Link>
            <Link to={`/${i18next.language}/Register`}>{t("Auth.register")}</Link>
          </div>
        }
      </div>
      <div className='search_bar_container'>
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
