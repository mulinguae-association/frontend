import React from "react";
import ResponsiveModal from "../../UI/ResponsiveModal";

const ConfirmDeleteModal = ({ open, onClose, onConfirm, user, isLoading }) => (
  <ResponsiveModal
    open={open}
    onClose={onClose}
    title="Confirm Delete"
    isConfirm
    handleConfirm={onConfirm}
    isLoading={isLoading}
  >
    <p>
      Are you sure you want to delete or deactivate user <b>{user?.name}</b>?
    </p>
  </ResponsiveModal>
);

export default ConfirmDeleteModal;
