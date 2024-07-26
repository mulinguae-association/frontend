import React, { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { submitLogout } from '../../../utils/auth-api';
import { notifySuccess } from '../../Notify';
import { useAuth } from '../../../contexts/AuthContext';
import UserMenu from './UserMenu';
import i18next from 'i18next';

const BlogsHeader = ({ searchQuery, handleSearchChange, handleSearchKeyPress }) => {
  const { userData, setUserData, isAuth, setIsAuth } = useAuth();
  const [showUserMenu, setShowMenuUser] = useState(false);
  const handleLogout = async () => {
    try {
      const res = await submitLogout();
      notifySuccess(res.data);
      // Update the authentication status to reflect the logout.
      setIsAuth(false);
      setUserData(null)
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <>
      <div className="links button-font">
        <Link to={`/${i18next.language}/pages/Blogs/Create-new-blog`}>+ Create A Blog</Link>
        <div>
          <input
            className="search bgSC"
            type="search"
            id='search-input-lgS'
            placeholder="Search by title or user name & Enter"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={handleSearchKeyPress}
          />
        </div>
        {isAuth ? (
          <div className='user_info'>
            <div className="img_container">
              <img
                width="150px"
                height="150px"
                src={userData.profileImage ? userData.profileImage : '/images/fallBackUser.png'}
                alt='user_image' onError={(e) => e.target.src = "/images/fallBackUser.png"}
                loading='lazy'
              />

            </div>
            <div onClick={() => (setShowMenuUser((prev) => !prev))} className='text_info'>
              <h2>{userData.name}</h2>
              <span><IoMdArrowDropdown size={20} /></span>
            </div>
            {showUserMenu && <UserMenu handleLogout={handleLogout} setShowMenuUser={setShowMenuUser} />}
          </div>
        ) :
          <div className="auth_Links">
            <Link to={`/${i18next.language}/login`}>Login</Link>
            <Link to={`/${i18next.language}/Register`}>Register</Link>
          </div>
        }
      </div>
      <div>
        <input
          className="search smSC"
          type="search"
          id='search-input-smS'
          placeholder="Search by title or user name & Enter"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyPress={handleSearchKeyPress}
        />
      </div>
    </>
  );
};

export default BlogsHeader;
