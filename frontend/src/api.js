import axios from "axios";

const API_URL = "http://localhost:5000";

// User APIs
export const registerUser = (data) => axios.post(`${API_URL}/register`, data);
export const loginUser = (data) => axios.post(`${API_URL}/login`, data);
export const getUsers = () => axios.get(`${API_URL}/users`);
export const getUserById = (id) => axios.get(`${API_URL}/users/${id}`);
export const updateUser = (id, data) =>
  axios.patch(`${API_URL}/users/${id}`, data);
export const deleteUser = (id) => axios.delete(`${API_URL}/users/${id}`);

// Kegiatan APIs
export const getKegiatan = () => axios.get(`${API_URL}/kegiatan`);
export const getKegiatanById = (id) => axios.get(`${API_URL}/kegiatan/${id}`);
export const createKegiatan = (data) => axios.post(`${API_URL}/kegiatan`, data);
export const updateKegiatan = (id, data) =>
  axios.patch(`${API_URL}/kegiatan/${id}`, data);
export const deleteKegiatan = (id) => axios.delete(`${API_URL}/kegiatan/${id}`);

// Add more API functions as needed
