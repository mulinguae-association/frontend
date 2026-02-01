import React from "react";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";
import "./Modal.scss";
import useLockBodyScroll from "./useLockBodyScroll";

const Modal = ({ open, onClose, title, children }) => {
  useLockBodyScroll(open);
  if (!open) return null;
  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-container">
        <div className="modal-header">
          {title && <h4>{title}</h4>}
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <FaTimes size={22} />
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </>
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Modal;
