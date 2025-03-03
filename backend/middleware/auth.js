const jwt = require('jsonwebtoken');
const SessionHistory = require('../models/SessionHistory');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    req.token = token;

    // Log the session
    const sessionId = await SessionHistory.logLogin(req.user.id, req.ip);
    req.sessionId = sessionId;

    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = authMiddleware;
