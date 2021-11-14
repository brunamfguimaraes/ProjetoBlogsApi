const joi = require('joi');

const validateBody = (body) => {
  const { error } = joi.object({
    displayName: joi.string().min(8).required(),
    email: joi.string().email().required(),
    password: joi.string().length(6).required(),
    image: joi.string(),
  }).validate(body);

  if (error) {
    throw error;
  }
};

const loginValidator = (body) => {
  const { error } = joi.object({
    email: joi.string().email().required(),
    password: joi.string().length(6).required(),
  }).validate(body);

  if (error) {
    throw error;
  }
};

const fieldsValidator = (user) => {
  if (!user) {
    const err = new Error('Invalid fields');
    err.statusCode = 400;

    throw err;
  }
};

const emailValidator = async (email, model) => {
  const user = await model.findOne({ where: { email } });

  if (user) {
    const err = new Error('User already registered');
    err.statusCode = 201;

    throw err;
  }
};

module.exports = {
  validateBody,
  loginValidator,
  fieldsValidator,
  emailValidator,
};
