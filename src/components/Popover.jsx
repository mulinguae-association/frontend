// src/components/Popover.jsx
import { FaTimes } from "react-icons/fa";
import "./Popover.scss";
import useLockBodyScroll from "./useLockBodyScroll";

const Popover = ({ isOpen, title, children, onClose }) => {
  useLockBodyScroll(isOpen);
  if (!isOpen) return null;
  return (
    <>
      <div className="popover-overlay" onClick={onClose}></div>
      <div className="popover-container">
        <div className="popover-trigger open">
          <div className="popover-header">
            {title && <h3>{title}</h3>}
            <button
              onClick={onClose}
              className="close-button"
              aria-label="Close"
            >
              <FaTimes size={22} />
            </button>
          </div>
          <div className="popover-content">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Popover;
