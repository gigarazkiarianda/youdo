import axios from 'axios';

// Function to get the token from localStorage
export const getToken = () => localStorage.getItem('authToken');

// Configure Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Authorization': `Bearer ${getToken()}`,
    'Content-Type': 'application/json'
  }
});

// Function for login
export const login = async (username, password, rememberMe) => {
  try {
    const response = await axiosInstance.post('/api/auth/login', {
      username,
      password
    });
    localStorage.setItem('authToken', response.data.token); 
    return response.data; 
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Network Error');
  }
};

// Function for registration
export const register = async (username, email, password) => {
  try {
    const response = await axiosInstance.post('/api/auth/register', {
      username,
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Network Error');
  }
};

// Function to display the token (for debugging)
export const displayToken = () => {
  const token = getToken();
  console.log('Auth Token:', token); // Log token to console
  return token;
};

// Function to clear the token (logout)
export const logout = () => {
  localStorage.removeItem('authToken');
};
