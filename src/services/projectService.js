import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

// Function to get all projects
export const getAllProjects = async () => {
  try {
    console.log('Fetching all projects');
    const response = await axiosInstance.get('/projects');
    console.log('Projects fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error.response ? error.response.data.message : 'Network Error');
    throw error;
  }
};

// Function to create a new project
export const createProject = async (project) => {
  try {
    console.log('Creating new project with data:', project);
    const response = await axiosInstance.post('/projects', project);
    console.log('Project created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error.response ? error.response.data.message : 'Network Error');
    throw error;
  }
};

// Function to update an existing project
export const updateProject = async (id, updatedProject) => {
  try {
    console.log('Updating project with ID:', id, 'and data:', updatedProject);
    const response = await axiosInstance.put(`/projects/${id}`, updatedProject);
    console.log('Project updated successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating project:', error.response ? error.response.data.message : 'Network Error');
    throw error;
  }
};

// Function to delete a project
export const deleteProject = async (id) => {
  try {
    console.log('Deleting project with ID:', id);
    await axiosInstance.delete(`/projects/${id}`);
    console.log('Project deleted successfully');
  } catch (error) {
    console.error('Error deleting project:', error.response ? error.response.data.message : 'Network Error');
    throw error;
  }
};

// Function to get projects by user ID
export const getProjectsByUserId = async (userId) => {
  if (!userId) {
    throw new Error('User ID is required');
  }

  try {
    console.log('Fetching projects for user with ID:', userId);
    const response = await axiosInstance.get(`/projects/user/${userId}`);
    if (response.data && Array.isArray(response.data)) {
      console.log('Projects fetched successfully for user:', response.data);
      return response.data;
    } else {
      console.error('Unexpected data format:', response.data);
      throw new Error('Unexpected data format');
    }
  } catch (error) {
    console.error('Error fetching projects for user:', error.response ? error.response.data.message : 'Network Error');
    throw error;
  }
};