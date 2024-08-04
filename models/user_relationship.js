const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const User = require('./User'); 

class UserRelationship extends Model {}

UserRelationship.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    followerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    followingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'UserRelationship',
    tableName: 'user_relationships',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['followerId', 'followingId'],
      },
    ],
  }
);

// Define associations
UserRelationship.belongsTo(User, { foreignKey: 'followerId', as: 'follower' });
UserRelationship.belongsTo(User, { foreignKey: 'followingId', as: 'following' });

module.exports = UserRelationship;
