import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { useBlogPosts } from '../../contexts/BlogsContext';
import { useGlobal } from '../../contexts/AppContext';
import { useTranslation } from 'react-i18next';
import Tooltip from '../HelperComponents/toolTip';
import { notifyError, notifySuccess } from '../Notify';
import "./UserSettings.scss";

function UserSettings() {
  const { t } = useTranslation("authPages/userProfile");
  const { userData, setUserData } = useAuth();
  const { fetchAcceptedData } = useBlogPosts();
  const { isBtnLoading, setButtonLoading } = useGlobal();

  const [name, setName] = useState(userData?.name || '');
  const [email, setEmail] = useState(userData?.email || '');
  const [profileImage, setProfileImage] = useState(null);

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

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

    if (name === userData?.name && email === userData?.email && !profileImage) {
      notifyError(t("noChangesMessage"));
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    try {
      setButtonLoading("userSettingsBtn", true);
      const res = await axios.put('/api/auth/user/update', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.status === 200) {
        notifySuccess(res.data.message);
        setUserData(res.data.data);
        fetchAcceptedData();
        setProfileImage(null);
      } else {
        notifyError(res.data.error);
      }
    } catch (error) {
      notifyError(error.response?.data?.error || error.message);
    } finally {
      setButtonLoading("userSettingsBtn", false);
    }
  };

  return (
    <main className='settings_page'>
      <div className='container'>
        <h1>{t("pageTitle")}</h1>
        <span>{t("pageDescription")}</span>
        <form onSubmit={handleSubmit}>
          <div className='input_container'>
            <label>{t("nameLabel")}</label>
            <input type="text" value={name} onChange={handleNameChange} />
          </div>
          <div className='input_container'>
            <label>{t("emailLabel")}</label>
            <input type="email" value={email} onChange={handleEmailChange} />
          </div>
          <div className='input_container'>
            <div className='img_container'>
              <img
                src={
                  profileImage
                    ? URL.createObjectURL(profileImage)
                    : userData?.profileImage || "/images/fallBackUser.png"
                }
                width="100px"
                height="100px"
                alt='personal profile'
                onError={(e) => e.target.src = "/images/fallBackUser.png"} />
            </div>
            <label className="upload_image" htmlFor="image">
              {t("changeImageText")}
              <Tooltip text={t("chooseImageTooltip")} />
            </label>
            <input
              id="image"
              className="input_image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <button disabled={isBtnLoading["userSettingsBtn"]} type="submit">
            {isBtnLoading["userSettingsBtn"] ? t("savingText") : t("saveChangesButton")}
          </button>
        </form>
      </div>
    </main>
  );
}

export default UserSettings;
