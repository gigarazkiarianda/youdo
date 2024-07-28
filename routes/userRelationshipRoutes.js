
const express = require('express');
const router = express.Router();
const {
  followUser,
  unfollowUser,
  getFollowersCount,
  getFollowingCount
} = require('../controllers/userRelationshipController.js');


router.post('/follow', followUser);
router.post('/unfollow', unfollowUser);
router.get('/followers/:id', getFollowersCount);
router.get('/following/:id', getFollowingCount);

module.exports = router;
