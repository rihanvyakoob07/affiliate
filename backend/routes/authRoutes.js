const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('../middleware/auth');
const ActivityLog = require('../models/ActivityLog');
const SessionHistory = require('../models/SessionHistory');

// Hardcoded user for development/testing
const hardcodedUser = {
  id: 1,
  username: 'admin',
  email: 'admin@example.com',
  // In production, this would be stored as a hashed value
  password: 'admin123',
  role: 'admin'
};

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication API
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticate a user and generate a token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *                 token:
 *                   type: string
 *                 sessionId:
 *                   type: integer
 *       400:
 *         description: Email and password are required
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Authentication failed
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate request body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // Check against hardcoded user
    if (email === hardcodedUser.email && password === hardcodedUser.password) {
      // Use environment variable with fallback for development
      const jwtSecret = process.env.JWT_SECRET || 'default_development_secret_key';
      
      if (!process.env.JWT_SECRET) {
        console.warn('WARNING: Using default JWT secret. Set JWT_SECRET environment variable for production.');
      }
      
      // Generate JWT token
      const token = jwt.sign(
        { 
          id: hardcodedUser.id, 
          username: hardcodedUser.username, 
          role: hardcodedUser.role 
        },
        jwtSecret,
        { expiresIn: '1d' }
      );
      
      try {
        // Log the successful login
        await ActivityLog.log(hardcodedUser.id, 'LOGIN', { email });
        
        // Record session
        const sessionId = await SessionHistory.logLogin(
          hardcodedUser.id, 
          req.ip
        );
        
        // Return user info (excluding password) and token
        return res.json({
          user: {
            id: hardcodedUser.id,
            username: hardcodedUser.username,
            email: hardcodedUser.email,
            role: hardcodedUser.role
          },
          token,
          sessionId
        });
      } catch (loggingError) {
        console.error('Error logging activity:', loggingError);
        // Continue with authentication even if logging fails
        return res.json({
          user: {
            id: hardcodedUser.id,
            username: hardcodedUser.username,
            email: hardcodedUser.email,
            role: hardcodedUser.role
          },
          token
        });
      }
    } else {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Authentication failed' });
  }
});

/**
 * @swagger
 * /api/auth/generate-token:
 *   post:
 *     summary: Generate a new token for a user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Token generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Only admins can generate tokens for other users
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to generate token
 */
router.post('/generate-token', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    // If generating token for another user, check if current user is admin
    if (userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Only admins can generate tokens for other users' });
    }
    
    // Use environment variable with fallback for development
    const jwtSecret = process.env.JWT_SECRET || 'default_development_secret_key';
    
    if (!process.env.JWT_SECRET) {
      console.warn('WARNING: Using default JWT secret. Set JWT_SECRET environment variable for production.');
    }
    
    // For simplicity, we'll just use the hardcoded user
    // In a real app, you would fetch the user from the database
    if (parseInt(userId) === hardcodedUser.id) {
      const token = jwt.sign(
        { 
          id: hardcodedUser.id, 
          username: hardcodedUser.username, 
          role: hardcodedUser.role 
        },
        jwtSecret,
        { expiresIn: '1d' }
      );
      
      try {
        await ActivityLog.log(req.user.id, 'GENERATE_TOKEN', { 
          target_user_id: userId 
        });
      } catch (loggingError) {
        console.error('Error logging token generation:', loggingError);
        // Continue even if logging fails
      }
      
      return res.json({ token });
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Token generation error:', error);
    return res.status(500).json({ error: 'Failed to generate token' });
  }
});

module.exports = router;
