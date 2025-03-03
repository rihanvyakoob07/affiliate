// const db = require('../config/database');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// class User {
//   static async createUser(userData) {
//     const { username, email, password, role = 'user' } = userData;
//     const hashedPassword = await bcrypt.hash(password, 10);
    
//     const query = `
//       INSERT INTO users (username, email, password, role, created_at)
//       VALUES (?, ?, ?, ?, NOW())
//     `;
    
//     try {
//       const [result] = await db.promise().query(query, [username, email, hashedPassword, role]);
//       const newUser = { id: result.insertId, username, email, role };
//       return newUser;
//     } catch (error) {
//       console.error('Error creating user:', error);
//       throw new Error('Failed to create user');
//     }
//   }

//   static async getUserById(id) {
//     const query = 'SELECT id, username, email, role, created_at FROM users WHERE id = ?';
    
//     try {
//       const [results] = await db.promise().query(query, [id]);
//       return results[0] || null;
//     } catch (error) {
//       console.error('Error fetching user:', error);
//       throw new Error('Failed to fetch user');
//     }
//   }

//   static async getUserByEmail(email) {
//     const query = 'SELECT * FROM users WHERE email = ?';
    
//     try {
//       const [results] = await db.promise().query(query, [email]);
//       return results[0] || null;
//     } catch (error) {
//       console.error('Error fetching user by email:', error);
//       throw new Error('Failed to fetch user');
//     }
//   }

//   static async updateUser(id, updateData) {
//     const { username, email, role } = updateData;
//     const query = `
//       UPDATE users
//       SET username = ?, email = ?, role = ?, updated_at = NOW()
//       WHERE id = ?
//     `;
    
//     try {
//       const [result] = await db.promise().query(query, [username, email, role, id]);
//       return result.affectedRows > 0;
//     } catch (error) {
//       console.error('Error updating user:', error);
//       throw new Error('Failed to update user');
//     }
//   }

//   static async deleteUser(id) {
//     const query = 'DELETE FROM users WHERE id = ?';
    
//     try {
//       const [result] = await db.promise().query(query, [id]);
//       return result.affectedRows > 0;
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       throw new Error('Failed to delete user');
//     }
//   }

//   static async authenticateUser(email, password) {
//     try {
//       const user = await this.getUserByEmail(email);
//       if (!user) return null;

//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) return null;

//       const token = jwt.sign(
//         { id: user.id, username: user.username, role: user.role },
//         process.env.JWT_SECRET,
//         { expiresIn: '1d' }
//       );

//       return { user: { id: user.id, username: user.username, email: user.email, role: user.role }, token };
//     } catch (error) {
//       console.error('Error authenticating user:', error);
//       throw new Error('Authentication failed');
//     }
//   }

//   static async changePassword(id, currentPassword, newPassword) {
//     try {
//       const user = await this.getUserById(id);
//       if (!user) throw new Error('User not found');

//       const isMatch = await bcrypt.compare(currentPassword, user.password);
//       if (!isMatch) throw new Error('Current password is incorrect');

//       const hashedNewPassword = await bcrypt.hash(newPassword, 10);
//       const query = 'UPDATE users SET password = ?, updated_at = NOW() WHERE id = ?';
      
//       await db.promise().query(query, [hashedNewPassword, id]);
//       return true;
//     } catch (error) {
//       console.error('Error changing password:', error);
//       throw error;
//     }
//   }

//   static async getAllUsers(options = {}) {
//     const { page = 1, limit = 10, role } = options;
//     let query = 'SELECT id, username, email, role, created_at FROM users';
//     const params = [];

//     if (role) {
//       query += ' WHERE role = ?';
//       params.push(role);
//     }

//     query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
//     params.push(limit, (page - 1) * limit);

//     try {
//       const [users] = await db.promise().query(query, params);
//       const [[{ total }]] = await db.promise().query('SELECT COUNT(*) as total FROM users' + (role ? ' WHERE role = ?' : ''), role ? [role] : []);

//       return {
//         users,
//         totalCount: total,
//         page,
//         totalPages: Math.ceil(total / limit)
//       };
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       throw new Error('Failed to fetch users');
//     }
//   }
// }

// module.exports = User;



const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class User {
  // Existing methods remain unchanged
  
  static authenticateHardcodedUser(email, password) {
    // Hardcoded user details for development
    const hardcodedUser = {
      id: 999,
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    };

    if (email === hardcodedUser.email && password === hardcodedUser.password) {
      // Use environment variable with fallback for development
      const jwtSecret = process.env.JWT_SECRET || 'default_development_secret_key';
      
      const token = jwt.sign(
        { id: hardcodedUser.id, username: hardcodedUser.username, role: hardcodedUser.role },
        jwtSecret,
        { expiresIn: '1d' }
      );
      
      return { 
        user: { 
          id: hardcodedUser.id, 
          username: hardcodedUser.username, 
          email: hardcodedUser.email, 
          role: hardcodedUser.role 
        }, 
        token 
      };
    }
    
    return null;
  }

  static async authenticateUser(email, password) {
    try {
      // Check if JWT_SECRET is configured
      if (!process.env.JWT_SECRET) {
        console.warn('JWT_SECRET is not set. Using fallback secret for development only.');
      }
      
      // First check if it matches hardcoded user
      const hardcodedAuth = this.authenticateHardcodedUser(email, password);
      if (hardcodedAuth) return hardcodedAuth;
      
      // Otherwise proceed with database authentication
      const user = await this.getUserByEmail(email);
      if (!user) return null;
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return null;
      
      // Use environment variable with fallback
      const jwtSecret = process.env.JWT_SECRET || 'default_development_secret_key';
      
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        jwtSecret,
        { expiresIn: '1d' }
      );
      
      return { 
        user: { 
          id: user.id, 
          username: user.username, 
          email: user.email, 
          role: user.role 
        }, 
        token 
      };
    } catch (error) {
      console.error('Error authenticating user:', error);
      throw new Error('Authentication failed');
    }
  }

  static generateToken(userId, username, role) {
    // Use environment variable with fallback
    const jwtSecret = process.env.JWT_SECRET || 'default_development_secret_key';
    
    return jwt.sign(
      { id: userId, username, role },
      jwtSecret,
      { expiresIn: '1d' }
    );
  }

  // Other methods remain unchanged
}

module.exports = User;

