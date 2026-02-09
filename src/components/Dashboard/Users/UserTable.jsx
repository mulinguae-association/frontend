import React from "react";
import Table from "../../UI/Table";
import UserActions from "./UserActions";
import { format } from "date-fns";
import { getDateFnsLocale } from "../../../utils/languageUtils";
import { useTranslation } from "react-i18next";

const UserTable = ({ users, onView, onEdit, onDelete, onRestore }) => {
  const { i18n } = useTranslation();
  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    {
      key: "status",
      label: "Status",
      render: (user) =>
        user.status === "deactivated" ? (
          <span style={{ color: "#d32f2f" }}>
            Suspended
            {user.deactivatedAt
              ? ` (${format(new Date(user.deactivatedAt), "MMM d, yyyy", {
                  locale: getDateFnsLocale(i18n.language),
                })})`
              : ""}
          </span>
        ) : (
          <span style={{ color: "#388e3c" }}>Active</span>
        ),
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
          onRestore={onRestore}
        />
      ),
    },
  ];
  return <Table columns={columns} data={users || []} pageSize={10} />;
};

export default UserTable;
