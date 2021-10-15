const checkBody = (validator) => (req, _res, next) => {
    validator(req.body);
    next();
  };

module.exports = checkBody;
