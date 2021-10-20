const Joi = require('joi');

const validateUser = (req, res, next) => {
  console.log('validate user');
  const { error } = Joi.object({
    displayName: Joi.string().min(8).not().empty()
      .required(),
    email: Joi.string().email().not().empty()
      .required(),
    password: Joi.string().min(6).not().empty()
      .required()
      .messages({
        'string.min': '"password" length must be 6 characters long',
      }),
    image: Joi.string(),
  }).validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message }); 
  next();
};

module.exports = validateUser;
