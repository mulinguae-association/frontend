import React, { useState } from 'react';
import axios from 'axios';
import { notifyError, notifySuccess } from '../Notify';
import { Link } from 'react-router-dom';
import { FaGlobe } from "react-icons/fa";
import { useGlobal } from '../../contexts/AppContext';
import InputField from '../HelperComponents/InputField'; // Import your InputField component

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const { isBtnLoading, setButtonLoading } = useGlobal();

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setButtonLoading("resetEmail", true);
      const res = await axios.post("/api/auth/forgot-password", { email });
      if (res.status === 200) {
        notifySuccess(res.data.message);
      } else {
        notifyError(res.data.error);
        console.log(res.data.error);
      }
      setEmailSent(true);
    } catch (error) {
      notifyError(error.response.data.error);
      setButtonLoading("resetEmail", false);
    } finally {
      setButtonLoading("resetEmail", false);
    }
  };

  return (
    <main className="auth_form forgot-password">
      <div className='container'>
        <div className='content'>
          <h2>Forgot Password</h2>
          {emailSent ? (
            <p>Instructions to reset your password have been sent to your email.</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <p>Please provide the email address linked to your account, and we'll promptly send you a password reset link</p>
              <div className='group'>
                <label>Email:</label>
                <InputField
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  placeholder='write your email'
                  required
                />
              </div>
              <button disabled={isBtnLoading['resetEmail']} type="submit">{isBtnLoading['resetEmail'] ? "Loading..." : "Send Reset Email"}</button>
            </form>
          )}
          <span className='earth_icon'><FaGlobe /></span>
        </div>
      </div>
      <p>Don't have an account? <Link to="/register">Sign up</Link></p>
    </main>
  );
}

export default ForgotPassword;
