const Joi = require('joi');

const validationNewUser = async (req, _res, next) => {
  const { error } = Joi.object().keys({
    displayName: Joi.string().min(8).max(50)
    .required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(80).required(),
    image: Joi.string(),
  }).validate(req.body);
  if (error) {
    console.log('error :', error);
    return next(error);
  }
  console.log('saindo');
  next();
};

module.exports = validationNewUser;