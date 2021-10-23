const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');

const validCreatePost = (req, res, next) => {
  const { error } = Joi.object(
    {
      title: Joi.string().required().not().empty(),
      content: Joi.string().required().not().empty(),
      categoryIds: Joi.array().required().not().empty(),
    },
  ).validate(req.body);

  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.details[0].message });
  }
  
  next();
};

module.exports = validCreatePost;