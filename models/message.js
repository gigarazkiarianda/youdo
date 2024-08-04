const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path to your database configuration
const ChatRoom = require('./chatRoom'); // Adjust the path to your ChatRoom model
const User = require('./User'); // Adjust the path to your User model

class Message extends Model {}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    chat_room_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ChatRoom,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sent_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Message',
    tableName: 'messages',
    timestamps: false, 
  }
);

// Define associations
Message.belongsTo(ChatRoom, { foreignKey: 'chat_room_id', as: 'chatRoom' });
Message.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = Message;
