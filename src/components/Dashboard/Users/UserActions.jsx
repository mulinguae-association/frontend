import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const UserActions = ({ user, onView, onEdit, onDelete }) => (
  <div className="user-actions">
    <button
      onClick={() => onEdit(user)}
      title="Edit User"
      className="btn action-btn edit"
    >
      <FaEdit />
    </button>
    <button
      onClick={() => onDelete(user)}
      title="Delete/Deactivate"
      className="btn action-btn delete"
    >
      <FaTrash />
    </button>
  </div>
);

export default UserActions;
