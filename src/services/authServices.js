import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/api/authlogin`, { username, password });
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const register = async (email, password) => {
  const response = await axios.post(`${API_URL}/api/auth/register`, {email, password});
  return response.data;
};


