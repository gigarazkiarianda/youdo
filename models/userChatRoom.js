const db = require('../config/db');

class UserChatRoom {
  static async addUserToChatRoom(user_id, chat_room_id) {
    await db.query(
      'INSERT INTO user_chat_rooms (user_id, chat_room_id) VALUES (?, ?)',
      [user_id, chat_room_id]
    );
  }

  static async removeUserFromChatRoom(user_id, chat_room_id) {
    await db.query(
      'DELETE FROM user_chat_rooms WHERE user_id = ? AND chat_room_id = ?',
      [user_id, chat_room_id]
    );
  }

  static async getChatRoomsForUser(user_id) {
    const [rows] = await db.query(
      'SELECT chat_room_id FROM user_chat_rooms WHERE user_id = ?',
      [user_id]
    );
    return rows.map(row => row.chat_room_id);
  }

  static async getUsersInChatRoom(chat_room_id) {
    const [rows] = await db.query(
      'SELECT user_id FROM user_chat_rooms WHERE chat_room_id = ?',
      [chat_room_id]
    );
    return rows.map(row => row.user_id);
  }
}

module.exports = UserChatRoom;
