const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/UnauthorizedError');
const errorMessages = require('../errors/error-messages');

const {secretKey} = require('../utils/config');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new UnauthorizedError(errorMessages.unAuthorized);
  }

  let payload;
  try {
    payload = jwt.verify(token, secretKey);
    req.user = payload;
    next();
  } catch (err) {
    throw new UnauthorizedError(errorMessages.unAuthorized);
  }
};
