const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');

const categoryValidation = (req, res, next) => {
  const { error } = Joi.object(
    {
      name: Joi.string().required().not().empty(),
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

module.exports = categoryValidation;