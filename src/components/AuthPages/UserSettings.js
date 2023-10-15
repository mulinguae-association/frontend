import React, { useState } from 'react';
import "./UserSettings.scss";
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { notifyError, notifySuccess } from '../Notify';
import Tooltip from '../HelperComponents/toolTip';
import { useBlogPosts } from '../../contexts/BlogsContext';
import { useGlobal } from '../../contexts/AppContext';

function UserSettings() {
  const { userData, setUserData } = useAuth();
  const { fetchAcceptedData } = useBlogPosts();
  const [name, setName] = useState(userData?.name);
  const [email, setEmail] = useState(userData?.email);
  const [profileImage, setProfileImage] = useState({});
  const { isBtnLoading, setButtonLoading } = useGlobal();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const maxImageSize = 1024 * 1024; // 1 MB

    if (file && file.size <= maxImageSize) {
      setProfileImage(file);
    } else {
      alert('Image size exceeds the maximum allowed limit.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (profileImage) {
      formData.append('profileImage', profileImage); // Add the image file if it exists
    }

    try {
      setButtonLoading("userSettingsBtn", true)
      const res = await axios.put('/api/auth/user/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the correct content type for FormData
        },
      });
      if (res.status === 200) {
        console.log(res)
        notifySuccess(res.data.message);
        setUserData(res.data.data);
        fetchAcceptedData();
      } else {
        console.log(res)
        notifyError(res.data.error);
      }
    } catch (error) {
      notifyError(error.response.data.error);
      console.error(error);
    } finally {
      setButtonLoading("userSettingsBtn", false)
    }
  };
  console.log(userData)
  return (
    <main className='settings_page'>
      <div className='container'>
        <h1>Account Settings</h1>
        <span>Change your profile and account settings</span>
        <form onSubmit={handleSubmit}>
          <div className='input_container'>
            <label>Name</label>
            <input type="text" value={name} onChange={handleNameChange} />
          </div>
          <div className='input_container'>
            <label>Email</label>
            <input type="email" value={email} onChange={handleEmailChange} />
          </div>
          <div className='input_container'>
            <img src={userData?.profileImage ? userData?.profileImage : "/images/fallBackUser.png"} alt='personal profile' onError={(e) => e.target.src = "/images/fallBackUser.png"} />
            <label className="upload_image" htmlFor="image">
              {!profileImage ? 'Change Image' : profileImage?.name || 'Change Image'}
              <Tooltip text="choose an image less than 1MB" />
            </label>
            <input
              id="image"
              className="input_image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <button disabled={isBtnLoading["userSettingsBtn"]} type="submit">{isBtnLoading["userSettingsBtn"] ? "Saving..." : "Save Changes"}</button>
        </form>
      </div>
    </main>
  );
}

export default UserSettings;
