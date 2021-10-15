const { schemaUser } = require('../helpers/validateUser');
const Error = require('../helpers/errors');

const userValidate = (req, res, next) => {
  const { error } = schemaUser.validate(req.body);
  const { code } = Error.badRequest();
  if (error) {
    return res.status(code).json({ 
       message: error.details[0].message,
    });
  }
  next();
};

module.exports = userValidate;