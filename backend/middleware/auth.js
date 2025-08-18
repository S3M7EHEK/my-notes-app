const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1]; // Expecting "Bearer <token>"
  if (!token) return res.status(401).json({ message: 'Token missing' });

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret'); // Use same secret as in login
    req.user = decoded; // Attach user info to request
    next(); // Proceed to route
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
