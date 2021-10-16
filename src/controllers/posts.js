const rescue = require('express-rescue');
const { BlogPost, Category, User } = require('../models');
const service = require('../services/posts');

const addBlogPost = rescue(async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const emailUser = req.user.email;
  
  const user = await User.findOne({ where: { email: emailUser } });
  const userId = user.id;

  const categoryExist = categoryIds 
  && await Category.findOne({ where: { id: categoryIds } });

  const validations = await service.addBlogPost({ title, content, categoryIds }, categoryExist);

  if ('code' in validations) {
    return next(validations);
  }

  const newBlogPost = await BlogPost.create({ title, content, userId });

  return res.status(201).json(newBlogPost);
});

module.exports = { 
  addBlogPost,
};