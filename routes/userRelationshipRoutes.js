const express = require('express');
const router = express.Router();
const userRelationship = require('../controllers/userRelationshipController.js');
const verifySession = require('../middleware/verifySession');



router.post('/follow', verifySession, userRelationship.followUser);
router.post('/unfollow', verifySession, userRelationship.unfollowUser);
router.get('/followers/:id',verifySession, userRelationship.getFollowersCount);
router.get('/following/:id',verifySession, userRelationship.getFollowingCount);

module.exports = router;
