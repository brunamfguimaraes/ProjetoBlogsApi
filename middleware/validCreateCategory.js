const Joi = require('joi');
// const { StatusCodes } = require('http-status-codes');

const validCreateCategory = (req, res, next) => {
  const { error } = Joi.object(
    { name: Joi.string().required().not().empty() },
  ).validate(req.body);
  
  if (error) return res.status(400).json({ message: error.details[0].message });
  
  next();
};

module.exports = validCreateCategory;