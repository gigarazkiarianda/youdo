const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const verifySession = require('../middleware/verifySession');

// Ensure no middleware is applied here
router.get('/', verifySession, projectController.getAllProjects);
router.get('/:id', verifySession, projectController.getProjectById);
router.post('/', verifySession, projectController.createProject);
router.put('/:id', verifySession, projectController.updateProject);
router.delete('/:id', verifySession, projectController.deleteProject);
router.get('/user/:userId', verifySession, projectController.getProjectsByUserId);

module.exports = router;
