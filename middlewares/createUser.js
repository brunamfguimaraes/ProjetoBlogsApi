const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');

const createUserValidation = (req, res, next) => {
  const { error } = Joi.object(
    {
      displayName: Joi.string().min(8).not().empty(),
      email: Joi.string().required().not().empty(),
      password: Joi.string().required().length(6).not()
      .empty(),
      image: Joi.string().required(),
    },
  ).validate(req.body);

  if (error) { 
    return res.status(StatusCodes.BAD_REQUEST).json(
      {
        message: error.details[0].message,
      }
    ); 
  }

  next();
};

module.exports = createUserValidation;