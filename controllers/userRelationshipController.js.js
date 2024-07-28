const db = require('../config/db');


exports.followUser = async (req, res) => {
  try {
    const { followerId, followingId } = req.body;

    if (followerId === followingId) {
      return res.status(400).json({ error: 'Cannot follow yourself' });
    }

    const [rows] = await db.query(
      'SELECT * FROM user_relationships WHERE followerId = ? AND followingId = ?',
      [followerId, followingId]
    );

    if (rows.length > 0) {
      return res.status(400).json({ error: 'Already following this user' });
    }

    
    await db.query(
      'INSERT INTO user_relationships (followerId, followingId) VALUES (?, ?)',
      [followerId, followingId]
    );
    res.status(201).json({ message: 'Followed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.unfollowUser = async (req, res) => {
  try {
    const { followerId, followingId } = req.body;

    const [rows] = await db.query(
      'SELECT * FROM user_relationships WHERE followerId = ? AND followingId = ?',
      [followerId, followingId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Relationship not found' });
    }

    await db.query(
      'DELETE FROM user_relationships WHERE followerId = ? AND followingId = ?',
      [followerId, followingId]
    );
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getFollowersCount = async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);

    const [rows] = await db.query(
      'SELECT COUNT(*) AS followersCount FROM user_relationships WHERE followingId = ?',
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ followersCount: rows[0].followersCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getFollowingCount = async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);

    const [rows] = await db.query(
      'SELECT COUNT(*) AS followingCount FROM user_relationships WHERE followerId = ?',
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ followingCount: rows[0].followingCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
