const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.getUserById(decoded.id);

    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate' });
  }
};

const adminMiddleware = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: 'Access denied. Admin only.' });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
