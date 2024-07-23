const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SocialMedia = sequelize.define('SocialMedia', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'social_media_posts',
});

module.exports = SocialMedia;
