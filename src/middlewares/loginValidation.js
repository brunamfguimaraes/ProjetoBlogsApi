const Joi = require('joi');

const schema = Joi.object().keys({
  email: Joi.string().not().email().empty()
  .required(),
  password: Joi.string().length(6).not().empty()
  .required(),
});

const loginValidation = (req, res, next) => {
  const user = req.body;
  const { error } = schema.validate(user);
  console.log(error, 'ERRRRROOOOORR');

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  return next();
};

module.exports = loginValidation;
