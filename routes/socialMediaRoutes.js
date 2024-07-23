const express = require('express');
const { getAllPosts, getPostById, createPost, updatePost, deletePost } = require('../controllers/socialMediaController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getAllPosts);
router.get('/:id', authMiddleware, getPostById);
router.post('/', authMiddleware, createPost);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;
