import axios from 'axios';

// Function to get the token from localStorage
export const getToken = () => localStorage.getItem('authToken');

// Configure Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to add the token to the request headers if it exists
axiosInstance.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Function for login
export const login = async (username, password, rememberMe) => {
  try {
    const response = await axiosInstance.post('/auth/login', {
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
    const response = await axiosInstance.post('/auth/register', {
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
export const logout = async () => {
  try {
    // Optionally, send a logout request to the server to invalidate the token
    await axiosInstance.post('/auth/logout');
  } catch (error) {
    console.error('Logout request failed:', error.response ? error.response.data.message : 'Network Error');
  } finally {
    // Remove token from localStorage
    localStorage.removeItem('authToken');
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
    throw new Error(error.response ? error.response.data.message : 'Network Error');
  }
};
