const db = require('../config/database');

class ActivityLog {
  static async log(user_id, action, details) {
    const query = `
      INSERT INTO activity_logs (user_id, action, details, timestamp)
      VALUES (?, ?, ?, NOW())
    `;
    try {
      const [result] = await db.promise().query(query, [user_id, action, JSON.stringify(details)]);
      return result.insertId;
    } catch (error) {
      console.error('Error logging activity:', error);
      throw new Error('Failed to log activity');
    }
  }

  static async getLogsByUser(user_id, limit = 50) {
    const query = 'SELECT * FROM activity_logs WHERE user_id = ? ORDER BY timestamp DESC LIMIT ?';
    try {
      const [results] = await db.promise().query(query, [user_id, limit]);
      return results;
    } catch (error) {
      console.error('Error fetching activity logs:', error);
      throw new Error('Failed to fetch activity logs');
    }
  }
}

module.exports = ActivityLog;
