let session = { isAuth: false, userData: null };
const listeners = new Set();

export const getSession = () => session;

export const setSession = (patch) => {
  session = { ...session, ...patch };
  listeners.forEach((listener) => listener(session));
  return session;
};

export const clearSession = () => setSession({ isAuth: false, userData: null });

export const subscribeSession = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};