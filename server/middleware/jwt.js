const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token,..log In again' });
    }

    console.log('Decoded payload:', decoded); // 

    // Extract the user ID from the decoded payload
    const userId = decoded.userId; // Access the property using camelCase

    // Attach the user ID to the request object
    req.userId = userId;

    next();
  });
}
module.exports = { verifyToken };