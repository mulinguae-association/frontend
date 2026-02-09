import React, { useState } from "react";
import { useQuery } from "react-query";
import { fetchUsers, updateUser, deleteUser, restoreUser } from "../../../apis/user-api";
import UserTable from "./UserTable";
import EditUserModal from "./EditUserModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import "./UserManagement.scss";

const UserManagement = () => {
  const {
    data: users,
    isLoading,
    isError,
    refetch,
  } = useQuery(["users"], () => fetchUsers().then((res) => res.data));

  // Modal and loading state
  const [editUser, setEditUser] = useState(null);
  const [deleteUserObj, setDeleteUserObj] = useState(null);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  // Action handlers
  const handleView = (user) => {
    // TODO: Show user profile modal
    alert(`View user: ${user.name}`);
  };
  const handleEdit = (user) => {
    setEditUser(user);
  };

  const handleDelete = (user) => {
    setDeleteUserObj(user);
  };

  const handleRestore = async (user) => {
    setIsEditLoading(true);
    try {
      await restoreUser(user._id);
      refetch();
    } catch (e) {
      // handle error
    }
    setIsEditLoading(false);
  };

  const handleEditSave = async (updated) => {
    setIsEditLoading(true);
    try {
      await updateUser(updated._id, {
        name: updated.name,
        email: updated.email,
        role: updated.role,
        // status is mapped to role for deactivation
        ...(updated.status === "deactivated" ? { role: "deactivated" } : {}),
      });
      setEditUser(null);
      refetch();
    } catch (e) {
      // handle error
    }
    setIsEditLoading(false);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteUserObj) return;
    setIsDeleteLoading(true);
    try {
      await deleteUser(deleteUserObj._id);
      setDeleteUserObj(null);
      refetch();
    } catch (e) {
      // handle error
    }
    setIsDeleteLoading(false);
  };

  return (
    <div className="user-management">
      <div className="container">
        {isLoading && <p>Loading users...</p>}
        {isError && <p>Error loading users.</p>}
        <UserTable
          users={users}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onRestore={handleRestore}
        />
        <EditUserModal
          open={!!editUser}
          onClose={() => setEditUser(null)}
          user={editUser}
          onSave={handleEditSave}
          isLoading={isEditLoading}
        />
        <ConfirmDeleteModal
          open={!!deleteUserObj}
          onClose={() => setDeleteUserObj(null)}
          onConfirm={handleDeleteConfirm}
          user={deleteUserObj}
          isLoading={isDeleteLoading}
        />
      </div>
    </div>
  );
};

export default UserManagement;
