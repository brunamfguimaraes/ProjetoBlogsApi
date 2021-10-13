const Joi = require('joi');
const httpStatus = require('../httpStatus');

const verifyCategoryName = (req, res, next) => {
  const { name } = req.body;
  const schema = Joi.object({
    name: Joi.string().required(),
  }).validate({ name });
  if (schema.error) {
    const { error: { message } } = schema;
    return res.status(httpStatus.badRequest).json({
      message,
    });
  }
  next();
};

module.exports = {
  verifyCategoryName,
};
