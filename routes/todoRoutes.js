// routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const verifySession = require('../middleware/verifySession');

router.post('/', verifySession, todoController.createTodo);
router.get('/', todoController.getAllTodos);
router.get('/:id', todoController.getTodoById);
router.put('/:id', verifySession, todoController.updateTodo);
router.delete('/:id', verifySession, todoController.deleteTodo);

module.exports = router;
