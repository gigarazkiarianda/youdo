import axios from 'axios';

// Base URL untuk API, sesuaikan dengan URL backend Anda
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// Menginisialisasi instance axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Menyertakan kredensial (cookie) dalam permintaan
});

// Mendapatkan ID pengguna dari localStorage
const getUserIdFromLocalStorage = () => {
  return localStorage.getItem('userId');
};

// Mendapatkan semua pengguna
export const getAllUsers = async () => {
  try {
    const response = await api.get('/users'); // Perbaiki endpoint ke `/users`
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Mendapatkan pengguna berdasarkan ID
export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    const userData = response.data;

    // Verifikasi bahwa data pengguna lengkap
    const requiredFields = ['id', 'username', 'fullname', 'email', 'password', 'number_phone', 'description', 'photo'];
    const isValid = requiredFields.every(field => field in userData);

    if (!isValid) {
      throw new Error('User data is incomplete');
    }

    return userData;
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    throw error;
  }
};

// Memperbarui pengguna berdasarkan ID
export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user:`, error);
    throw error;
  }
};

// Menghapus pengguna berdasarkan ID
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user:`, error);
    throw error;
  }
};
