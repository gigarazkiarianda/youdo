const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Todo = sequelize.define('Todo', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'todos',
});

module.exports = Todo;
