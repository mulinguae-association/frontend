import "./Drawer.scss";

const Drawer = ({ isOpen, onClose, children, title }) => {
  return (
    <>
      {/* Overlay to dim background and capture clicks to close */}
      {isOpen && <div className="drawer-overlay" onClick={onClose}></div>}

      {/* The main drawer component */}
      <div className={`drawer ${isOpen ? "open" : "closed"}`}>
        <div className="drawer-header">
          {title && <h3>{title}</h3>}
          <button onClick={onClose} className="close-button">
            &times; {/* This is an 'X' character */}
          </button>
        </div>
        <div className="drawer-content">{children}</div>
      </div>
    </>
  );
};

export default Drawer;
