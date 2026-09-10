/**
 * Whether the given role has admin powers (mirrors the backend's
 * `["admin", "superadmin"]` check in the controllers).
 * @param {string|undefined} role - The user's role from the profile.
 * @returns {boolean}
 */
export const isAdminRole = (role) => ["admin", "superadmin"].includes(role);