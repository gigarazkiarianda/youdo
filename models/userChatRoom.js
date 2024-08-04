const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const User = require('./User'); 
const ChatRoom = require('./chatRoom'); 

class UserChatRoom extends Model {}

UserChatRoom.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
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
  },
  {
    sequelize,
    modelName: 'UserChatRoom',
    tableName: 'user_chat_rooms',
    timestamps: false, 
    primaryKey: false, 
  }
);


UserChatRoom.removeAttribute('id'); 
UserChatRoom.primaryKey = ['user_id', 'chat_room_id'];


UserChatRoom.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
UserChatRoom.belongsTo(ChatRoom, { foreignKey: 'chat_room_id', as: 'chatRoom' });

module.exports = UserChatRoom;
