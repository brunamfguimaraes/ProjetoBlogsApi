const joi = require('joi');

const validationNewUser = async (req, _res, next) => {
  const { error } = joi.object().keys({
    displayName: joi.string().min(8).max(50)
    .required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(80).required(),
    image: joi.string(),
  }).validate(req.body);
  if (error) {
    console.log('error :', error);
    return next(error);
  }
  next();
};

module.exports = validationNewUser;