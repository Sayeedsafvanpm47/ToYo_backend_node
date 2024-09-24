const jwt = require('jsonwebtoken');
const authenticateJWT = (req, res, next) => {
    try {
      // Get the token from cookies (assuming it's stored in 'jwt')
      const token = req.cookies.jwt;
  
      // Check if the token exists
      if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
      }
  
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_KEY); // Replace with your JWT secret key
  
      // Attach user details (from the token) to the request object
      req.user = decoded;
  
      // Proceed to the next middleware or route
      next();
    } catch (error) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }
  };
  
  module.exports = authenticateJWT;