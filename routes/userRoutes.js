
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifySession = require('../middleware/verifySession');

router.get('/', verifySession, userController.getAllUsers);


router.get('/:id', verifySession, userController.getUserById);
router.put('/:id', verifySession, userController.updateUser);

// Menghapus pengguna (memerlukan hak admin)
router.delete('/:id', verifySession, userController.deleteUser);

module.exports = router;
