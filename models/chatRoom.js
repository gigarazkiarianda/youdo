// models/chatRoom.js
const db = require('../config/db');

class ChatRoom {
  static async create(name) {
    const [result] = await db.query(
      'INSERT INTO chat_rooms (name) VALUES (?)',
      [name]
    );
    return result.insertId;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM chat_rooms WHERE id = ?', [id]);
    return rows[0];
  }

  static async update(id, name) {
    await db.query(
      'UPDATE chat_rooms SET name = ? WHERE id = ?',
      [name, id]
    );
  }

  static async delete(id) {
    await db.query('DELETE FROM chat_rooms WHERE id = ?', [id]);
  }
}

module.exports = ChatRoom;
