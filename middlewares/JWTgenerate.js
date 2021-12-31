const jwt = require('jsonwebtoken');

module.exports = (payload, options, secret) => {
  const token = jwt.sign(payload, secret, options);
  return token;
};