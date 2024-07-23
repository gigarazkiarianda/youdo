const pool = require('../config/db');


exports.getAllProjects = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM projects');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving projects' });
  }
};


exports.getProjectById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    if (rows.length) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving project' });
  }
};


exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const [result] = await pool.query('INSERT INTO projects (name, description) VALUES (?, ?)', [name, description]);
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating project' });
  }
};


exports.updateProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const [result] = await pool.query('UPDATE projects SET name = ?, description = ? WHERE id = ?', [name, description, req.params.id]);
    if (result.affectedRows) {
      res.json({ message: 'Project updated' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating project' });
  }
};


exports.deleteProject = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
    if (result.affectedRows) {
      res.json({ message: 'Project deleted' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project' });
  }
};
