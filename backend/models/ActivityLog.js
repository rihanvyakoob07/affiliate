const db = require('../config/database');

class ActivityLog {
  static async log(user_id, action, details) {
    try {
      // Verify user exists before attempting to log
      const [userCheck] = await db.promise().query('SELECT 1 FROM users WHERE id = ? LIMIT 1', [user_id]);
      
      if (userCheck.length === 0) {
        console.warn(`Skipping activity log: User ID ${user_id} does not exist in database`);
        return null;
      }
      
      const query = `
        INSERT INTO activity_logs (user_id, action, details, timestamp)
        VALUES (?, ?, ?, NOW())
      `;
      
      const [result] = await db.promise().query(query, [user_id, action, JSON.stringify(details)]);
      return result.insertId;
    } catch (error) {
      console.error('Error logging activity:', error);
      throw new Error('Failed to log activity');
    }
  }

  // Keep other methods unchanged
  static async getLogsByUser(user_id, limit = 50, offset = 0) {
    const query = 'SELECT * FROM activity_logs WHERE user_id = ? ORDER BY timestamp DESC LIMIT ? OFFSET ?';
    try {
      const [results] = await db.promise().query(query, [user_id, limit, offset]);
      return results;
    } catch (error) {
      console.error('Error fetching activity logs:', error);
      throw new Error('Failed to fetch activity logs');
    }
  }

  static async getLogsByAction(action, limit = 50, offset = 0) {
    const query = 'SELECT * FROM activity_logs WHERE action = ? ORDER BY timestamp DESC LIMIT ? OFFSET ?';
    try {
      const [results] = await db.promise().query(query, [action, limit, offset]);
      return results;
    } catch (error) {
      console.error('Error fetching activity logs by action:', error);
      throw new Error('Failed to fetch activity logs by action');
    }
  }
}

module.exports = ActivityLog;
