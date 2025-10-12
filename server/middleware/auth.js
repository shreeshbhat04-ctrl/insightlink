const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const tokenHeader = req.header('Authorization');

  if (!tokenHeader) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const token = tokenHeader.split(' ')[1];
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};