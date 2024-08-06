const pool = require('../config/database');

// Mendapatkan semua proyek
exports.getAllProjects = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM projects');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving projects', error: error.message });
  }
};

// Mendapatkan proyek berdasarkan ID
exports.getProjectById = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    if (rows.length) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving project', error: error.message });
  }
};

// Membuat proyek baru
exports.createProject = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const { name, description } = req.body;
    const [result] = await pool.query('INSERT INTO projects (name, description) VALUES (?, ?)', [name, description]);
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error: error.message });
  }
};

// Memperbarui proyek
exports.updateProject = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const { name, description } = req.body;
    const [result] = await pool.query('UPDATE projects SET name = ?, description = ? WHERE id = ?', [name, description, req.params.id]);
    if (result.affectedRows) {
      res.json({ message: 'Project updated' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error: error.message });
  }
};

// Menghapus proyek
exports.deleteProject = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const [result] = await pool.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
    if (result.affectedRows) {
      res.json({ message: 'Project deleted' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
};
