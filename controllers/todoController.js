const pool = require('../config/db');
const { authenticateToken } = require('../middleware/authMiddleware'); // Ensure this path is correct

// Create todo (protected route)
exports.createTodo = async (req, res) => {
  const { title, description, category, deadline, status } = req.body;
  const userId = req.userId; // Get UserId from the request object

  console.log('UserID from request:', userId); // Debugging line

  if (!title || !description || !category || !deadline || !status) {
    console.log('Validation failed. Missing fields:', {
      title,
      description,
      category,
      deadline,
      status,
    });
    return res.status(400).json({ message: 'Required fields are missing' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO todos (title, description, category, deadline, status, userId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())',
      [title, description, category, deadline, status, userId]
    );

    res.status(201).json({ id: result.insertId });
  } catch (error) {
    console.error('Error creating todo:', error.message, error.stack);
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

// Update todo (protected route)
exports.updateTodo = async (req, res) => {
  const todoId = req.params.id;
  const { title, description, category, deadline, status } = req.body;
  const userId = req.userId; // Get UserId from the request object

  if (!todoId) {
    return res.status(400).json({ message: 'Todo ID is required' });
  }

  const fields = [];
  const values = [];

  if (title) {
    fields.push('title = ?');
    values.push(title);
  }
  if (description) {
    fields.push('description = ?');
    values.push(description);
  }
  if (category) {
    fields.push('category = ?');
    values.push(category);
  }
  if (deadline) {
    fields.push('deadline = ?');
    values.push(deadline);
  }
  if (status) {
    fields.push('status = ?');
    values.push(status);
  }

  if (fields.length === 0) {
    return res.status(400).json({ message: 'No fields provided for update' });
  }

  values.push(todoId); // Add the todoId to the end of values array

  try {
    const [result] = await pool.query(
      `UPDATE todos SET ${fields.join(', ')}, updatedAt = NOW() WHERE id = ? AND userId = ?`,
      [...values, userId]
    );
    if (result.affectedRows) {
      res.json({ message: 'Todo updated successfully' });
    } else {
      res.status(404).json({ message: 'Todo not found or not authorized to update' });
    }
  } catch (error) {
    console.error('Error updating todo:', error.message);
    res.status(500).json({ message: 'Error updating todo', error: error.message });
  }
};

// Delete todo (protected route)
exports.deleteTodo = async (req, res) => {
  const todoId = req.params.id;
  const userId = req.userId; 

  if (!todoId) {
    return res.status(400).json({ message: 'Todo ID is required' });
  }

  try {
    const [result] = await pool.query('DELETE FROM todos WHERE id = ? AND userId = ?', [todoId, userId]);
    if (result.affectedRows) {
      res.json({ message: 'Todo deleted successfully' });
    } else {
      res.status(404).json({ message: 'Todo not found or not authorized to delete' });
    }
  } catch (error) {
    console.error('Error deleting todo:', error.message);
    res.status(500).json({ message: 'Error deleting todo', error: error.message });
  }
};
