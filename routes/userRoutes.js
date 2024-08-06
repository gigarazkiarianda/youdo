// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Mendapatkan semua pengguna
router.get('/', userController.getAllUsers);

// Mendapatkan pengguna berdasarkan ID
router.get('/:id', userController.getUserById);

// Memperbarui informasi pengguna
router.put('/:id', userController.updateUser);

// Menghapus pengguna
router.delete('/:id', userController.deleteUser);

module.exports = router;
