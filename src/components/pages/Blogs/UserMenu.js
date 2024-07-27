import React from 'react'
import { Link } from 'react-router-dom'
import { useClickOutside } from '../../../utils/ClickOutside'
import { useAuth } from '../../../contexts/AuthContext'
import i18next from 'i18next'

const UserMenu = ({ handleLogout, setShowMenuUser }) => {
  const { isAuth, userData } = useAuth()
  const userMenu = useClickOutside(() => {
    setShowMenuUser(null)
  })
  return (
    <div ref={userMenu} className='user_menu'>
      {(isAuth && userData.role === "admin") &&
        <Link to={`/${i18next.language}/dashboard`} className='user-link'>
          Dashboard
        </Link>
      }
      <Link to={`/${i18next.language}/user/settings`} className='user-link'>
        Settings
      </Link>
      <button onClick={handleLogout} className='logout-button'>
        Logout
      </button>
    </div>)
}

export default UserMenu