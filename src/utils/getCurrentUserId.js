/**
 * Get the current user's id from the profile object regardless of which
 * field the backend uses (`userId`, `_id`, or nested `user.userId`/`user._id`).
 * @param {object|null|undefined} userData - The authenticated user profile.
 * @returns {string|undefined} The user id, or undefined when not logged in.
 */
export const getCurrentUserId = (userData) =>
  userData?.userId ||
  userData?._id ||
  userData?.id ||
  userData?.user?.userId ||
  userData?.user?._id ||
  userData?.user?.id;