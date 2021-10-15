const Joi = require('joi');

const nameExistsErr = { 
  err: {
    status: 400,
    message: {
      message: '"name" is required',
    },
} };

function validateName(name) {
  const validation = Joi.string().required().validate(name);
  if (validation.error) return nameExistsErr;
  return false;
}

function validateCategory(req, res, next) {
  const { name } = req.body;
  const nameIsNotValid = validateName(name);

  if (nameIsNotValid) return res.status(nameIsNotValid.err.status).json(nameIsNotValid.err.message);

  next();
}

module.exports = validateCategory;