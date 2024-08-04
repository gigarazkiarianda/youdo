const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jwtSecret: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    number_phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: [['jpeg', 'png', 'jpg']],
      },
    },
    followers_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    following_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    projects_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
  }
);

module.exports = User;
