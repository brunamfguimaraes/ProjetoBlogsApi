const rescue = require('express-rescue');
const Joi = require('joi');

const validCategory = rescue(async (req, _res, next) => {
   const { error } = Joi.object({
      name: Joi.string().required(),
   }).validate(req.body);
   if (error) {
      return next(error);
   }
   return next();
});

module.exports = { validCategory };
