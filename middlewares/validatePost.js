const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { BlogPost, Category, User } = require('../models');

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

const verifyPostById = async (id) => {
  const findPostById = await BlogPost.findOne({ 
    where: { id },
    include: [{ model: User, as: 'user' }, { model: Category, as: 'categories' }],
  });
  if (!findPostById) {
    const err = new Error('Post does not exist');
    err.statusCode = 404;
    return err;
  }
  return findPostById;
};

module.exports = {
  validationPost,
  decodeToken,
  verifyPostById,
};