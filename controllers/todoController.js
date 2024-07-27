// controllers/todoController.js
const pool = require('../config/db');

// Get all todos (public route)
exports.getAllTodos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM todos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving todos' });
  }
};

// Create todo (public route)
exports.createTodo = async (req, res) => {
  try {
    const { title, completed, userId } = req.body; // Include userId in request body
    const [result] = await pool.query('INSERT INTO todos (title, completed, user_id) VALUES (?, ?, ?)', [title, completed, userId]);
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating todo' });
  }
};

// Get todo by ID (public route)
exports.getTodoById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM todos WHERE id = ?', [req.params.id]);
    if (rows.length) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving todo' });
  }
};

// Update todo (public route)
exports.updateTodo = async (req, res) => {
  try {
    const { title, completed } = req.body;
    const [result] = await pool.query('UPDATE todos SET title = ?, completed = ? WHERE id = ?', [title, completed, req.params.id]);
    if (result.affectedRows) {
      res.json({ message: 'Todo updated' });
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo' });
  }
};

// Delete todo (public route)
exports.deleteTodo = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM todos WHERE id = ?', [req.params.id]);
    if (result.affectedRows) {
      res.json({ message: 'Todo deleted' });
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo' });
  }
};
