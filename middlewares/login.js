const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');

const loginValidation = (req, res, next) => {
  const { error } = Joi.object(
    {
      email: Joi.string().required().not().empty(),
      password: Joi.string().required().length(6).not()
      .empty(),
    },
  ).validate(req.body);

  if (error) { 
    return res.status(StatusCodes.BAD_REQUEST).json(
      {
        message: error.details[0].message,
      },
    ); 
  }

  next();
};

module.exports = loginValidation;