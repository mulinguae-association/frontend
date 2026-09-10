import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './index.scss';

const ConfirmationModal = ({ message, onConfirm, onCancel, isLoading }) => {
  const { t } = useTranslation('global');
  return (
    <div className="modal_overlay">
      <div className="modal_content">
        <h2>{message}</h2>
        <div className="modal_actions">
          <button className="confirm_button" disabled={isLoading} onClick={onConfirm}>{isLoading ? t('app.loading') : t('app.yes')}</button>
          <button className="cancel_button" onClick={onCancel}>{t('app.no')}</button>
        </div>
      </div>
    </div>
  );
};

ConfirmationModal.propTypes = {
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmationModal;
