import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';


const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true 
});


export const getAllTodos = async () => {
  try {
    console.log('Fetching all todos'); 
    const response = await axiosInstance.get('/todos');
    console.log('Todos fetched successfully:', response.data); 
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error.response ? error.response.data.message : 'Network Error'); // Log error
    throw error;
  }
};


export const createTodo = async (todo) => {
  try {
    console.log('Creating new todo with data:', todo); 
    const response = await axiosInstance.post('/todos', todo);
    console.log('Todo created successfully:', response.data); 
    return response.data;
  } catch (error) {
    console.error('Error creating todo:', error.response ? error.response.data.message : 'Network Error'); // Log error
    throw error;
  }
};


export const updateTodo = async (id, updatedTodo) => {
  try {
    console.log('Updating todo with ID:', id, 'and data:', updatedTodo); 
    const response = await axiosInstance.put(`/todos/${id}`, updatedTodo);
    console.log('Todo updated successfully:', response.data); 
    return response.data;
  } catch (error) {
    console.error('Error updating todo:', error.response ? error.response.data.message : 'Network Error'); // Log error
    throw error;
  }
};


export const deleteTodo = async (id) => {
  try {
    console.log('Deleting todo with ID:', id); 
    await axiosInstance.delete(`/todos/${id}`);
    console.log('Todo deleted successfully'); 
  } catch (error) {
    console.error('Error deleting todo:', error.response ? error.response.data.message : 'Network Error'); // Log error
    throw error;
  }
};

export const getTodosByUserId = async (userId) => {
  try {
    console.log('Fetching todos for user with ID:', userId); 
    const response = await axiosInstance.get(`/todos/user/${userId}`);
    console.log('Todos fetched successfully for user:', response.data); 
    return response.data;
  } catch (error) {
    console.error('Error fetching todos for user:', error.response ? error.response.data.message : 'Network Error'); // Log error
    throw error;
  }
};
