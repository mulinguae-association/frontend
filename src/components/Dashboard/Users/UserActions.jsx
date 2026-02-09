import React from "react";
import { FaEye, FaEdit, FaTrash, FaUndo } from "react-icons/fa";

const UserActions = ({ user, onEdit, onDelete, onRestore }) => (
  <div className="user-actions">
    <button
      onClick={() => onEdit(user)}
      title="Edit User"
      className="btn action-btn edit"
    >
      <FaEdit />
    </button>
    {user.status === "deactivated" ? (
      <button
        onClick={() => onRestore(user)}
        title="Restore User"
        className="btn action-btn restore"
      >
        <FaUndo />
      </button>
    ) : (
      <button
        onClick={() => onDelete(user)}
        title="Deactivate"
        className="btn action-btn delete"
      >
        <FaTrash />
      </button>
    )}
  </div>
);

export default UserActions;
