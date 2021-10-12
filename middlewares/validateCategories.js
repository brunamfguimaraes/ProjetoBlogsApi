const Joi = require('joi');

const validateCategories = (req, res, next) => {
  const { error } = Joi.object({
    name: Joi.string().not().empty()
      .required()
      .messages({
        'string.min': '"name" is required',
      }),
    
  }).validate(req.body);
  
  if (error) return res.status(400).json({ message: error.details[0].message }); 
  
  next();
};

module.exports = validateCategories;
