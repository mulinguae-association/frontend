import React from 'react'
import { Link } from 'react-router-dom'
import { useClickOutside } from '../../../utils/ClickOutside'
import { useAuth } from '../../../contexts/AuthContext'

const UserMenu = ({ handleLogout, setShowMenuUser }) => {
  const { isAuth, userData } = useAuth()
  const userMenu = useClickOutside(() => {
    setShowMenuUser(null)
  })
  console.log(userData)
  return (
    <div ref={userMenu} className='user_menu'>
      {(isAuth && userData.role === "admin") &&
        <Link to='/dashboard' className='user-link'>
          Dashboard
        </Link>
      }
      <Link to="/user/settings" className='user-link'>
        Settings
      </Link>
      <button onClick={handleLogout} className='logout-button'>
        Logout
      </button>
    </div>)
}

export default UserMenu