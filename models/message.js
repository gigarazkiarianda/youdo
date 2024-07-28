
const db = require('../config/db');

class Message {
  static async create({ chat_room_id, user_id, message }) {
    const [result] = await db.query(
      'INSERT INTO messages (chat_room_id, user_id, message) VALUES (?, ?, ?)',
      [chat_room_id, user_id, message]
    );
    return result.insertId;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM messages WHERE id = ?', [id]);
    return rows[0];
  }

  static async findByChatRoom(chat_room_id) {
    const [rows] = await db.query('SELECT * FROM messages WHERE chat_room_id = ?', [chat_room_id]);
    return rows;
  }
  
  static async delete(id) {
    await db.query('DELETE FROM messages WHERE id = ?', [id]);
  }
}

module.exports = Message;
