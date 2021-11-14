const bodyValidator = (validator) => (req, _res, next) => {
  validator(req.body);

  next();
};

module.exports = bodyValidator;
