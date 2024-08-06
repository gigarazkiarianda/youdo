const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const verifySession = require('../middleware/verifySession');

// Ensure no middleware is applied here
router.get('/projects', verifySession, projectController.getAllProjects);
router.get('/projects/:id', verifySession, projectController.getProjectById);
router.post('/projects', verifySession, projectController.createProject);
router.put('/projects/:id', verifySession, projectController.updateProject);
router.delete('/projects/:id', verifySession, projectController.deleteProject);

module.exports = router;
