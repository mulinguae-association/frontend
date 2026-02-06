import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";
import "./Modal.scss";
import useLockBodyScroll from "../../../hooks/useLockBodyScroll";

const Modal = ({ open, onClose, title, children, ...props }) => {
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
        {props.isConfirm && (
          <div className="modal-footer">
            <button
              className="btn cancel"
              onClick={() => props.setConfirmOpen(false)}
            >
              {props.btnTitle || "Cancel"}
            </button>
            <button className="btn confirm" onClick={props.handleConfirm}>
              {props.isLoading
                ? "Loading..."
                : props.btnConfirmTitle || "Confirm"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  isConfirm: PropTypes.bool,
  setConfirmOpen: PropTypes.func,
  handleConfirm: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default Modal;
