import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

export const getAllTodos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/todos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export const createTodo = async (todo) => {
  try {
    const response = await axios.post(`${BASE_URL}/todos`, todo);
    return response.data;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

export const updateTodo = async (id, updatedTodo) => {
  try {
    const response = await axios.put(`${BASE_URL}/todos/${id}`, updatedTodo);
    return response.data;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/todos/${id}`);
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};
