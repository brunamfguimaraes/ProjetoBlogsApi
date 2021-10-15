const authMiddleware = (tokenValidator) => (req, _res, next) => {
  const token = req.headers.authorization;  
  req.user = tokenValidator(token);
  next();
};

module.exports = authMiddleware;
