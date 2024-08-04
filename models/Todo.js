const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path to your database configuration
const User = require('./User'); // Adjust the path to your User model

class Todo extends Model {}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true, // Can be mandatory if set to false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true, // Can be mandatory if set to false
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: true, // Can be mandatory if set to false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending', // Default status can be 'pending', 'in-progress', etc.
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onUpdate: 'CASCADE',
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
    modelName: 'Todo',
    tableName: 'todos',
    timestamps: true,
  }
);

// Define associations
Todo.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = Todo;
