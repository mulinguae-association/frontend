import React from "react";
import PropTypes from "prop-types";
import "./Modal.scss";

export const ModalHeader = ({ children, onClose, closeBtn = true }) => (
  <div className="modal-header">
    <div className="modal-header-content">{children}</div>
    {closeBtn && (
      <button className="modal-close" onClick={onClose}>
        &times;
      </button>
    )}
  </div>
);

ModalHeader.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
  closeBtn: PropTypes.bool,
};

const Modal = ({
  isOpen,
  onClose,
  children,
  header,
  className = "",
  overlayStyle = {},
  modalStyle = {},
  closeBtn = true,
}) => {
  if (!isOpen) return null;
  return (
    <div className={`modal-overlay ${className}`} style={overlayStyle}>
      <div className="modal-content" style={modalStyle}>
        <ModalHeader onClose={onClose} closeBtn={closeBtn}>
          {header}
        </ModalHeader>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  header: PropTypes.node,
  className: PropTypes.string,
  overlayStyle: PropTypes.object,
  modalStyle: PropTypes.object,
  closeBtn: PropTypes.bool,
};

export default Modal;
