const pool = require('../config/database');

// Create project (protected route)
exports.createProject = async (req, res) => {
  const { name, description, category } = req.body;
  const userId = req.session.userId; // Get UserId from the session

  if (!name || !description || !category) {
    return res.status(400).json({ message: 'Required fields are missing' });
  }

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: No user session found' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO projects (name, description, category, userId, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())',
      [name, description, category, userId]
    );

    res.status(201).json({ id: result.insertId });
  } catch (error) {
    console.error('Error creating project:', error.message);
    res.status(500).json({ message: 'Error creating project', error: error.message });
  }
};

// Get all projects (public route)
exports.getAllProjects = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM projects');
    res.json(rows);
  } catch (error) {
    console.error('Error retrieving projects:', error.message);
    res.status(500).json({ message: 'Error retrieving projects', error: error.message });
  }
};

// Get project by ID (public route)
exports.getProjectById = async (req, res) => {
  const projectId = req.params.id;

  if (!projectId) {
    return res.status(400).json({ message: 'Project ID is required' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [projectId]);
    if (rows.length) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    console.error('Error retrieving project:', error.message);
    res.status(500).json({ message: 'Error retrieving project', error: error.message });
  }
};

// Get projects by user ID (protected route)
exports.getProjectsByUserId = async (req, res) => {
  const userId = req.session.userId; // Get UserId from the session

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: No user session found' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM projects WHERE userId = ?', [userId]);
    res.json(rows);
  } catch (error) {
    console.error('Error retrieving projects for user:', error.message);
    res.status(500).json({ message: 'Error retrieving projects for user', error: error.message });
  }
};

// Update project (protected route)
exports.updateProject = async (req, res) => {
  const projectId = req.params.id;
  const { name, description, category } = req.body;
  const userId = req.session.userId; 

  if (!projectId || !name || !description || !category) {
    return res.status(400).json({ message: 'Required fields are missing' });
  }

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: No user session found' });
  }

  try {
    const [result] = await pool.query(
      'UPDATE projects SET name = ?, description = ?, category = ?, updatedAt = NOW() WHERE id = ? AND userId = ?',
      [name, description, category, projectId, userId]
    );

    if (result.affectedRows) {
      res.json({ message: 'Project updated successfully' });
    } else {
      res.status(404).json({ message: 'Project not found or unauthorized' });
    }
  } catch (error) {
    console.error('Error updating project:', error.message);
    res.status(500).json({ message: 'Error updating project', error: error.message });
  }
};

// Delete project (protected route)
exports.deleteProject = async (req, res) => {
  const projectId = req.params.id;
  const userId = req.session.userId; 

  if (!projectId) {
    return res.status(400).json({ message: 'Project ID is required' });
  }

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: No user session found' });
  }

  try {
    const [result] = await pool.query('DELETE FROM projects WHERE id = ? AND userId = ?', [projectId, userId]);

    if (result.affectedRows) {
      res.json({ message: 'Project deleted successfully' });
    } else {
      res.status(404).json({ message: 'Project not found or unauthorized' });
    }
  } catch (error) {
    console.error('Error deleting project:', error.message);
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
};
