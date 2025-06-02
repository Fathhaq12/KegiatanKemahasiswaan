import axios from "axios";

const API_URL = "https://kemahasiswaan-1061342868557.us-central1.run.app/api";

// Tambahkan interceptor agar setiap request menyertakan Authorization jika ada token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// User APIs
export const registerUser = (data) =>
  axios.post(`${API_URL}/create-users`, data);
export const loginUser = async (data) => {
  const res = await axios.post(`${API_URL}/login`, data);
  if (res.data && res.data.accessToken) {
    localStorage.setItem("accessToken", res.data.accessToken);
  }
  if (res.data && res.data.refreshToken) {
    localStorage.setItem("refreshToken", res.data.refreshToken);
  }
  if (res.data && res.data.safeUserData) {
    localStorage.setItem("userData", JSON.stringify(res.data.safeUserData));
  }
  localStorage.setItem("isLoggedIn", "true");
  return res;
};
export const getUsers = () => axios.get(`${API_URL}/users`);
export const getUserById = (id) => axios.get(`${API_URL}/users/${id}`);
export const updateUser = (id, data) =>
  axios.put(`${API_URL}/update-users/${id}`, data);
export const deleteUser = (id) => axios.delete(`${API_URL}/users/${id}`);

// Kegiatan APIs
export const getKegiatan = () => axios.get(`${API_URL}/kegiatan`);
export const getKegiatanById = (id) => axios.get(`${API_URL}/kegiatan/${id}`);
export const createKegiatan = (data) => axios.post(`${API_URL}/kegiatan`, data);
export const updateKegiatan = (id, data) =>
  axios.patch(`${API_URL}/kegiatan/${id}`, data);
export const deleteKegiatan = (id) => axios.delete(`${API_URL}/kegiatan/${id}`);

// Add more API functions as needed
