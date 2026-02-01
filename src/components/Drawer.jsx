import { FaTimes } from "react-icons/fa";
import "./Drawer.scss";
import useLockBodyScroll from "./useLockBodyScroll";

const Drawer = ({ isOpen, onClose, children, title }) => {
  useLockBodyScroll(isOpen);
  return (
    <>
      {/* Overlay to dim background and capture clicks to close */}
      {isOpen && <div className="drawer-overlay" onClick={onClose}></div>}

      {/* The main drawer component */}
      <div className={`drawer ${isOpen ? "open" : "closed"}`}>
        <div className="drawer-header">
          {title && <h3>{title}</h3>}
          <button onClick={onClose} className="close-button" aria-label="Close">
            <FaTimes size={22} />
          </button>
        </div>
        <div className="drawer-content">{children}</div>
      </div>
    </>
  );
};

export default Drawer;
