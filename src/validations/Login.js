const Joi = require('joi');

const loginEntries = (loginInfo) => {
  const { error } = Joi.object({
    email: Joi.string().email().not().empty()
      .required(),
    password: Joi.string().length(6).not().empty()
      .required(),
  }).validate(loginInfo);

  if (error) return { message: error.details[0].message };

  return {};
};

module.exports = {
  loginEntries,
};
