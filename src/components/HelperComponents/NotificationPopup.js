import React from "react";
import "./NotificationPopup.scss";
import { IoMdCheckmarkCircle, IoMdCloseCircle } from "react-icons/io";
import { useClickOutside } from "../../utils/ClickOutside";

const NotificationPopup = ({ message, setNotification }) => {
  console.log(message)
  const notifcationPopup = useClickOutside(() => { setNotification(null) })

  const handleClose = () => {
    setNotification(null);
  };
  if (!message) {
    return null; // Don't render anything if there's no message
  }
  return (
    <div className={`notification_popup`}>
      <div ref={notifcationPopup} className="popup_content">
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
