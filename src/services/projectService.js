import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL; 

export const getProjects = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

