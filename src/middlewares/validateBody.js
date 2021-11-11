const validateBody = (validator) => (req, _res, next) => {
  validator(req.body);
  next();
};

module.exports = validateBody;