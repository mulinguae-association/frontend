// ResetPassword.js
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaGlobe } from 'react-icons/fa';
import { notifyError } from '../Notify';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetSuccessful, setResetSuccessful] = useState(false);
  const { id, token } = useParams();
  const navigate = useNavigate()
  console.log(password, confirmPassword)
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send a request to your server to reset the password
    try {
      const res = await axios.post(`/api/auth/reset-password/${id}/${token}`, {
        password: password,
        confirmPassword: confirmPassword,
      })
      if (res.status === 200) {
        alert("successfuly reset password")
        navigate("/login")
      } else {
        notifyError(res.message)
      }

      setResetSuccessful(true);
    } catch (error) {
      notifyError(error.response.data.message)
    }
  };

  return (
    <div className="reset-password auth_form">
      <div className='container'>
        <div className='content'>

          <h2>Reset Password</h2>
          {resetSuccessful ? (
            <p>Your password has been successfully reset.</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className='group'>
                <label htmlFor="password">New Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  placeholder="Enter your new password"
                />
              </div>
              <div className='group'>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                  placeholder="Confirm your new password"
                />
              </div>
              <button type="submit">Reset Password</button>
            </form>
          )}
          <span className='earth_icon'><FaGlobe /></span>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
