import "./AuthStyle.scss";
import React, { useState } from 'react';
import { submitRegister } from '../../utils/auth-api';
import { notifyError, notifySuccess } from '../Notify';
import { useNavigate } from 'react-router';
import { FaGlobe } from 'react-icons/fa';
import { useGlobal } from "../../contexts/AppContext";
import InputField from '../HelperComponents/InputField'; // Import your InputField component

function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    profileImage: '', // Initialize as an empty string
  });
  const { isBtnLoading, setButtonLoading } = useGlobal();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      notifyError("Password must be at least 6 characters long.")
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      notifyError("Passwords do not match. Please make sure the password and confirm password match.")
      return;
    }

    try {
      setButtonLoading("registerBtn", true);
      const res = await submitRegister(formData);
      if (res.error) {
        notifyError(res.error);
      } else {
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          profileImage: '',
        });
        notifySuccess(res.message + " " + formData.name);
        navigate("/login");
      }
    } catch (error) {
      notifyError(error.message);
      setButtonLoading("registerBtn", false);
      console.log(error);
    } finally {
      setButtonLoading("registerBtn", false);
    }
  };

  return (
    <main className='auth_form'>
      <div className='container'>
        <div className='content'>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <div className='group'>
              <InputField
                label="Name:"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
              />
            </div>

            <div className='group'>
              <InputField
                label="Email:"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                required
              />
            </div>

            <div className='group'>
              <InputField
                label="Password:"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Your Password"
              />
            </div>

            <div className='group'>
              <InputField
                label="Confirm Password:"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm Password"
              />
            </div>
            <button disabled={isBtnLoading['registerBtn']} type="submit">{isBtnLoading['registerBtn'] ? "Loading..." : "Register"}</button>
          </form>
          <span className='earth_icon'><FaGlobe /></span>
        </div>
      </div>
    </main>
  );
}

export default Registration;
