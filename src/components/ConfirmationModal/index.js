import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const ConfirmationModal = ({ message, onConfirm, onCancel, isLoading }) => {
  return (
    <div className="modal_overlay">
      <div className="modal_content">
        <h2>{message}</h2>
        <div className="modal_actions">
          <button className="confirm_button" disabled={isLoading} onClick={onConfirm}>{isLoading ? 'Loading...' : "Yes"}</button>
          <button className="cancel_button" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

ConfirmationModal.propTypes = {
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isLoading: PropTypes.func.isRequired,
};

export default ConfirmationModal;
