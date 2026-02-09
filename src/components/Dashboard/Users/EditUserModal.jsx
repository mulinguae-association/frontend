import React, { useEffect, useState } from "react";
import ResponsiveModal from "../../UI/ResponsiveModal";
import CustomDropdown from "../../UI/CustomDropdown";
import Input from "../../UI/Input";

const EditUserModal = ({ open, onClose, user, onSave, isLoading }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState(user?.role || "user");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setRole(user.role || "user");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Only send fields that changed or are not empty
    const updated = { ...user };
    if (name && name !== user?.name) updated.name = name;
    if (email && email !== user?.email) updated.email = email;
    if (role && role !== user?.role) updated.role = role;
    onSave(updated);
  };

  return (
    <ResponsiveModal
      open={open}
      onClose={onClose}
      title="Edit User"
      isConfirm={true}
      handleConfirm={handleSubmit}
      btnConfirmTitle="Save"
      setConfirmOpen={onClose}
      isLoading={isLoading}
    >
      <form
        onSubmit={handleSubmit}
        className="edit-user-form"
        style={{
          minHeight: 250,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          justifyContent: "center",
        }}
      >
        <Input
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <div className="edit-user-dropdowns">
          <div className="edit-user-role">
            <label>Role</label>
            <CustomDropdown
              options={[
                { value: "user", label: "User" },
                { value: "admin", label: "Admin" },
              ]}
              value={role}
              onChange={setRole}
            />
          </div>
        </div>
        <button type="submit" style={{ display: "none" }} />
      </form>
    </ResponsiveModal>
  );
};

export default EditUserModal;
