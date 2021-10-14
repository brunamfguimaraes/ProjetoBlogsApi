const Joi = require('joi');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const validationPost = (body) => 
  Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required(),
  }).validate(body);

const decodeToken = (token) => {
  const decoded = jwt.verify(token, SECRET);
  const { dataValues: { id } } = decoded;
  return id;
};

module.exports = {
  validationPost,
  decodeToken,
};