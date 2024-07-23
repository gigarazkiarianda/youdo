const pool = require('../config/db');


exports.getAllTodos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM todos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving to-dos' });
  }
};


exports.getTodoById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM todos WHERE id = ?', [req.params.id]);
    if (rows.length) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'To-do not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving to-do' });
  }
};


exports.createTodo = async (req, res) => {
  try {
    const { title, completed } = req.body;
    const [result] = await pool.query('INSERT INTO todos (title, completed) VALUES (?, ?)', [title, completed]);
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating to-do' });
  }
};


exports.updateTodo = async (req, res) => {
  try {
    const { title, completed } = req.body;
    const [result] = await pool.query('UPDATE todos SET title = ?, completed = ? WHERE id = ?', [title, completed, req.params.id]);
    if (result.affectedRows) {
      res.json({ message: 'To-do updated' });
    } else {
      res.status(404).json({ message: 'To-do not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating to-do' });
  }
};

// Delete to-do
exports.deleteTodo = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM todos WHERE id = ?', [req.params.id]);
    if (result.affectedRows) {
      res.json({ message: 'To-do deleted' });
    } else {
      res.status(404).json({ message: 'To-do not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting to-do' });
  }
};
