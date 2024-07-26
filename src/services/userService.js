import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getUserProfile = async () => {
    const response = await axios.get(`${API_URL}/api/users/`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
     });
  return response.data;
};