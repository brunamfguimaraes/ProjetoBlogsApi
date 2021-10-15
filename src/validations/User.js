const Joi = require('joi');

const checkBodyRequest = (bodyObj) => {
  const { error } = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
    image: Joi.string(),
  }).validate(bodyObj);

  if (error) throw error;
};

const checkBodyLogin = (bodyObj) => {
  const { error } = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
  }).validate(bodyObj);

  if (error) throw error;
};

module.exports = {
  checkBodyRequest,
  checkBodyLogin,
};
