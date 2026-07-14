const AUTH_STORAGE_KEY = "trust-superAdmin";
const REMEMBERED_EMAIL_KEY = "trust-superAdmin-email";

const parseStoredValue = (value) => {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

export const getStoredSession = () =>
  parseStoredValue(sessionStorage.getItem(AUTH_STORAGE_KEY)) ||
  parseStoredValue(localStorage.getItem(AUTH_STORAGE_KEY));

export const hasAuthSession = () => Boolean(getStoredSession()?.role);

export const storeAuthSession = (authData, rememberMe = false) => {
  const payload = JSON.stringify({
    role: authData?.role,
  });

  sessionStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem(AUTH_STORAGE_KEY);
  const targetStorage = rememberMe ? localStorage : sessionStorage;
  targetStorage.setItem(AUTH_STORAGE_KEY, payload);
};

export const clearAuthSession = () => {
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const getRememberedEmail = () =>
  localStorage.getItem(REMEMBERED_EMAIL_KEY) || "";

export const storeRememberedEmail = (email) => {
  localStorage.setItem(REMEMBERED_EMAIL_KEY, email);
};

export const clearRememberedEmail = () => {
  localStorage.removeItem(REMEMBERED_EMAIL_KEY);
};
