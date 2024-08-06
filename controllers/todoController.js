// controllers/todoController.js
const pool = require('../config/database');

// Create todo (protected route)
exports.createTodo = async (req, res) => {
  const { title, description, category, deadline, status } = req.body;
  const userId = req.session.userId; // Get UserId from the session

  if (!title || !description || !category || !deadline || !status) {
    return res.status(400).json({ message: 'Required fields are missing' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO todos (title, description, category, deadline, status, userId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())',
      [title, description, category, deadline, status, userId]
    );

    res.status(201).json({ id: result.insertId });
  } catch (error) {
    console.error('Error creating todo:', error.message);
    res.status(500).json({ message: 'Error creating todo', error: error.message });
  }
};

// Get all todos (public route)
exports.getAllTodos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM todos');
    res.json(rows);
  } catch (error) {
    console.error('Error retrieving todos:', error.message);
    res.status(500).json({ message: 'Error retrieving todos', error: error.message });
  }
};

// Get todo by ID (public route)
exports.getTodoById = async (req, res) => {
  const todoId = req.params.id;

  if (!todoId) {
    return res.status(400).json({ message: 'Todo ID is required' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM todos WHERE id = ?', [todoId]);
    if (rows.length) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (error) {
    console.error('Error retrieving todo:', error.message);
    res.status(500).json({ message: 'Error retrieving todo', error: error.message });
  }
};

// Get todos by user ID (protected route)
exports.getTodosByUserId = async (req, res) => {
  const userId = req.session.userId; // Get UserId from the session

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM todos WHERE userId = ?', [userId]);
    res.json(rows);
  } catch (error) {
    console.error('Error retrieving todos for user:', error.message);
    res.status(500).json({ message: 'Error retrieving todos for user', error: error.message });
  }
};


exports.updateTodo = async (req, res) => {
  const todoId = req.params.id;
  const { title, description, category, deadline, status } = req.body;
  const userId = req.session.userId; 

  if (!todoId || !title || !description || !category || !deadline || !status) {
    return res.status(400).json({ message: 'Required fields are missing' });
  }

  try {
    const [result] = await pool.query(
      'UPDATE todos SET title = ?, description = ?, category = ?, deadline = ?, status = ?, updatedAt = NOW() WHERE id = ? AND userId = ?',
      [title, description, category, deadline, status, todoId, userId]
    );

    if (result.affectedRows) {
      res.json({ message: 'Todo updated successfully' });
    } else {
      res.status(404).json({ message: 'Todo not found or unauthorized' });
    }
  } catch (error) {
    console.error('Error updating todo:', error.message);
    res.status(500).json({ message: 'Error updating todo', error: error.message });
  }
};


exports.deleteTodo = async (req, res) => {
  const todoId = req.params.id;
  const userId = req.session.userId; 

  if (!todoId) {
    return res.status(400).json({ message: 'Todo ID is required' });
  }

  try {
    const [result] = await pool.query('DELETE FROM todos WHERE id = ? AND userId = ?', [todoId, userId]);

    if (result.affectedRows) {
      res.json({ message: 'Todo deleted successfully' });
    } else {
      res.status(404).json({ message: 'Todo not found or unauthorized' });
    }
  } catch (error) {
    console.error('Error deleting todo:', error.message);
    res.status(500).json({ message: 'Error deleting todo', error: error.message });
  }
};
