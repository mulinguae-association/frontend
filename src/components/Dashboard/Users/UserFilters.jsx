import CustomDropdown from "../../UI/CustomDropdown";

const UserFilters = ({
  search,
  setSearch,
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter,
  onSearch,
}) => (
  <div className="user-management-controls">
    <input
      type="text"
      placeholder="Search by name or email"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    <CustomDropdown
      options={[
        { value: "", label: "All Roles" },
        { value: "admin", label: "Admin" },
        { value: "user", label: "User" },
      ]}
      value={roleFilter}
      onChange={setRoleFilter}
      className="user-filter-dropdown"
    />
    <CustomDropdown
      options={[
        { value: "", label: "All Status" },
        { value: "user", label: "Active" },
        { value: "deactivated", label: "Suspended" },
      ]}
      value={statusFilter}
      onChange={setStatusFilter}
      className="user-filter-dropdown"
    />
    <button onClick={onSearch}>Search</button>
  </div>
);

export default UserFilters;
