const { validateToken } = require('../utils');

const authentication = (req, _res, next) => {
  const { authorization } = req.headers;
  const payload = validateToken(authorization);
  req.user = payload;
  next();
};

module.exports = {
  authentication,
};
