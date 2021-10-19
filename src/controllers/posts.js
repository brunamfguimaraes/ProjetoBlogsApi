const rescue = require('express-rescue');
const { BlogPost, Category, User } = require('../models');
const service = require('../services/posts');

const addBlogPost = rescue(async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const { userId } = req.user;

  const categoryExist = categoryIds 
  && await Category.findOne({ where: { id: categoryIds } });

  const validations = await service.addBlogPost({ title, content, categoryIds }, categoryExist);

  if ('code' in validations) {
    return next(validations);
  }

  const newBlogPost = await BlogPost.create({ title, content, userId });

  return res.status(201).json(newBlogPost);
});

const getAllBlogPost = rescue(async (req, res) => {
  const allBlogPost = await BlogPost.findAll({ 
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ], 
  });

  return res.status(200).json(allBlogPost);
});

module.exports = { 
  addBlogPost,
  getAllBlogPost,
};