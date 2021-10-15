const { schemaLogin } = require('../helpers/validateLogin');
const Error = require('../helpers/errors');

const loginValidate = (req, res, next) => {
  const { error } = schemaLogin.validate(req.body);
  const { code } = Error.badRequest();
  if (error) {
    res.status(code).json({
      message: error.details[0].message,
    });
  }
  next();
};

module.exports = loginValidate;