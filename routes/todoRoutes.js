const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const todoController = require('../controllers/todoController');

// Apply middleware to protected routes
router.post('/',  authenticateToken, todoController.createTodo);
router.put('/todos/:id',  authenticateToken, todoController.updateTodo);
router.delete('/todos/:id', authenticateToken, todoController.deleteTodo);

// Public routes
router.get('/', todoController.getAllTodos);
router.get('/todos/:id', todoController.getTodoById);

module.exports = router;
