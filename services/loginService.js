const Joi = require('joi');
const { User } = require('../models');
const { createJWT } = require('../auth/JWToken');

const getByEmail = async (email, password) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
}).validate({ email, password });
  if (schema.error) return { message: schema.error.message, status: 400 };
 const checkEmail = await User.findOne({ where: { email } });
 if (!checkEmail) return { message: 'Invalid fields', status: 400 };
 const { id } = checkEmail;
 const token = createJWT({ id });
return { token, status: 200 };
};

module.exports = { getByEmail };
