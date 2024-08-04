const User = require('./User');
const Project = require('./Project');
const Todo = require('./Todo');
const Notification = require('./Notification');
const UserRelationship = require('./user_relationship');
const ChatRoom = require('./chatRoom');
const Message = require('./message');
const UserChatRoom = require('./userChatRoom');

module.exports = {
  User,
  Project,
  Todo,
  Notification,
  UserRelationship, 
  ChatRoom, 
  Message,
  UserChatRoom,
  ChatParticipant
};

Object.values(models).forEach(model => {
  if (typeof model.associate === 'function') {
    model.associate(models);
  }
});

module.exports = models;