import React from "react";
import Table from "../../UI/Table";
import UserActions from "./UserActions";

const UserTable = ({ users, onView, onEdit, onDelete }) => {
  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    {
      key: "status",
      label: "Status",
      render: (user) => (user.role === "deactivated" ? "Suspended" : "Active"),
    },
    {
      key: "actions",
      label: "Actions",
      render: (user) => (
        <UserActions
          user={user}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ),
    },
  ];

  return <Table columns={columns} data={users || []} pageSize={10} />;
};

export default UserTable;
