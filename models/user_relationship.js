const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user'); // Asumsi Anda memiliki model User

const UserRelationship = sequelize.define('UserRelationship', {
  followerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  followingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'user_relationships',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['followerId', 'followingId']
    }
  ]
});

// Set up associations
UserRelationship.belongsTo(User, { as: 'follower', foreignKey: 'followerId' });
UserRelationship.belongsTo(User, { as: 'following', foreignKey: 'followingId' });

module.exports = UserRelationship;
