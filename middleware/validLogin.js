const Joi = require('joi');
// const { StatusCodes } = require('http-status-codes');

const validLogin = (req, res, next) => {
  const { error } = Joi.object(
    {
      email: Joi.string().required().not().empty(),
      password: Joi.string().required().not().empty(),
    },
    ).validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message }); 
    }

    next();
};

module.exports = validLogin;