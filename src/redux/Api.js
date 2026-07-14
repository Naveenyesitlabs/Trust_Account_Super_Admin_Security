import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    if ((status === 401 || status === 403 || message === "Invalid token.") && typeof window !== 'undefined') {
      window.dispatchEvent(new Event('auth-expired'));
    }

    return Promise.reject(error);
  }
);

export const login = (formData) => API.post("/api/login", formData);
export const checkUser = () => API.get("/api/protected");
export const logout = (id) => API.post('/api/logout', id, {});
export const getAllFirms = () => API.get(`/api/superadmin/get-allfirm`);
export const addFirms = (formData) => API.post(`/api/superadmin/add-firm`, formData);
export const updateFirm = (formData) => API.put(`/api/superadmin/update-firm`, formData);
export const updateFirmsAccess = (formData) => API.put(`/api/superadmin/update-access-status`, formData);
export const updateSuspendStatus = (formData) => API.put(`/api/superadmin/update-suspend-status`, formData);
export const deleteFirm = (id) => API.delete(`/api/superadmin/delete-firm/${id}`);
export const getAllNotification = () => API.get(`/api/superadmin/get-notifications`);
export const markAsRead = (notification_id) => API.put(`/api/superadmin/mark-as-read`, notification_id);
export const getSubscriptions = () => API.get(`/api/user/get-subscriptions`);
