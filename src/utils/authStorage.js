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
  parseStoredValue(sessionStorage.getItem(AUTH_STORAGE_KEY));

export const hasAuthSession = () => Boolean(getStoredSession()?.role);

export const storeAuthSession = (authData) => {
  const payload = JSON.stringify({
    role: authData?.role,
  });

  sessionStorage.setItem(AUTH_STORAGE_KEY, payload);
};

export const clearAuthSession = () => {
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
};

export const getRememberedEmail = () =>
  sessionStorage.getItem(REMEMBERED_EMAIL_KEY) || "";

export const storeRememberedEmail = (email) => {
  sessionStorage.setItem(REMEMBERED_EMAIL_KEY, email);
};

export const clearRememberedEmail = () => {
  sessionStorage.removeItem(REMEMBERED_EMAIL_KEY);
};
