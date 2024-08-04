import React from "react";
import "./NotificationPopup.scss";
import { IoMdCheckmarkCircle, IoMdCloseCircle } from "react-icons/io";

const NotificationPopup = ({ message, setNotification }) => {
  const handleClose = () => {
    setNotification({});
  };
  if (!message) {
    return null; // Don't render anything if there's no message
  }
  return (
    <div className={`notification_popup`}>
      <div className="popup_content">
        <div className="icon">
          <IoMdCheckmarkCircle />
        </div>
        <p>{message}</p>
        <button onClick={handleClose} className="close_button">
          <IoMdCloseCircle />
        </button>
      </div>
    </div>
  );
};

export default NotificationPopup;
