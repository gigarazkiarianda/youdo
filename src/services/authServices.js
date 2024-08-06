import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// Create an Axios instance with cookies enabled
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Allow sending cookies with requests
});

// Function for login
export const login = async (username, password) => {
  try {
    const response = await axiosInstance.post('/auth/login', {
      username,
      password
    });
    // Server will set the session cookie
    console.log('Login successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data.message : 'Network Error');
    throw new Error(error.response ? error.response.data.message : 'Network Error');
  }
};

// Function for registration
export const register = async (username, email, password) => {
  try {
    const response = await axiosInstance.post('/auth/register', {
      username,
      email,
      password
    });
    console.log('Registration successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error.response ? error.response.data.message : 'Network Error');
    throw new Error(error.response ? error.response.data.message : 'Network Error');
  }
};

// Function to display session (for debugging)
export const displaySession = async () => {
  try {
    const response = await axiosInstance.get('/auth/session');
    console.log('Session Data:', response.data); // Log session data to console
    return response.data;
  } catch (error) {
    console.error('Failed to retrieve session data:', error.response ? error.response.data.message : 'Network Error');
  }
};

// Function for logout
export const logout = async () => {
  try {
    await axiosInstance.post('/auth/logout');
    console.log('Logout successful');
  } catch (error) {
    console.error('Logout request failed:', error.response ? error.response.data.message : 'Network Error');
  }
};

// Function to make authenticated requests
export const makeAuthenticatedRequest = async (method, url, data = null) => {
  try {
    const response = await axiosInstance.request({
      method,
      url,
      data
    });
    return response.data;
  } catch (error) {
    console.error('Authenticated request failed:', error.response ? error.response.data.message : 'Network Error');
    throw new Error(error.response ? error.response.data.message : 'Network Error');
  }
};
