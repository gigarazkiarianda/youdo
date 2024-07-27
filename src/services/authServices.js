import axios from 'axios';

// Retrieve the API URL from environment variables

const API_URL = process.env.REACT_APP_API_URL;

export const login = async (username, password, rememberMe) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      username,
      password
    });
    return response.data; // Assuming the API returns some data upon successful login
    
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Network Error');
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/register`, {
      username,
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Network Error');
  }
};
