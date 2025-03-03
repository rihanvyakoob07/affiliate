const db = require('../config/database');

class SessionHistory {
  static async logLogin(user_id, ip_address) {
    const query = `
      INSERT INTO session_history (user_id, ip_address, login_time)
      VALUES (?, ?, NOW())
    `;
    try {
      const [result] = await db.promise().query(query, [user_id, ip_address]);
      return result.insertId;
    } catch (error) {
      console.error('Error logging session:', error);
      throw new Error('Failed to log session');
    }
  }

  static async logLogout(session_id) {
    const query = 'UPDATE session_history SET logout_time = NOW() WHERE id = ?';
    try {
      await db.promise().query(query, [session_id]);
    } catch (error) {
      console.error('Error updating session logout:', error);
      throw new Error('Failed to update session logout');
    }
  }

  static async getSessionsByUser(user_id, limit = 50) {
    const query = 'SELECT * FROM session_history WHERE user_id = ? ORDER BY login_time DESC LIMIT ?';
    try {
      const [results] = await db.promise().query(query, [user_id, limit]);
      return results;
    } catch (error) {
      console.error('Error fetching session history:', error);
      throw new Error('Failed to fetch session history');
    }
  }
}

module.exports = SessionHistory;
