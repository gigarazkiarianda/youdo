const pool = require('../config/db');


exports.getAllPosts = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM social_media_posts');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving social media posts' });
  }
};


exports.getPostById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM social_media_posts WHERE id = ?', [req.params.id]);
    if (rows.length) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving post' });
  }
};


exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const [result] = await pool.query('INSERT INTO social_media_posts (content) VALUES (?)', [content]);
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating post' });
  }
};


exports.updatePost = async (req, res) => {
  try {
    const { content } = req.body;
    const [result] = await pool.query('UPDATE social_media_posts SET content = ? WHERE id = ?', [content, req.params.id]);
    if (result.affectedRows) {
      res.json({ message: 'Post updated' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating post' });
  }
};


exports.deletePost = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM social_media_posts WHERE id = ?', [req.params.id]);
    if (result.affectedRows) {
      res.json({ message: 'Post deleted' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post' });
  }
};
