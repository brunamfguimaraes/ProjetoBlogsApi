const status = require('http-status');
const { BlogPost, User } = require('../models');
const postService = require('../services/postService');

const validTitle = async (req, res, next) => {
  const { title } = req.body;

  const isValidTitle = postService.isValidTitle(title);
  
  if (isValidTitle) {
    return res.status(status.BAD_REQUEST).json({ message: isValidTitle });
  }
    
  next();
};

const validContent = async (req, res, next) => {
  const { content } = req.body;

  const isValidContent = postService.isValidContent(content);
  
  if (isValidContent) {
    return res.status(status.BAD_REQUEST).json({ message: isValidContent });
  }
    
  next();
};

const validCategoryIds = async (req, res, next) => {
  const { categoryIds } = req.body;

  const isValidCategoryIds = postService.isValidCategoryIds(categoryIds);
  
  if (isValidCategoryIds) {
    return res.status(status.BAD_REQUEST).json({ message: isValidCategoryIds });
  }
    
  next();
};

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  
  const { email } = req.email;
  console.log(email);

  const user = await User.findOne({ where: { email } });
  
  const post = await BlogPost.create({ userId: user.id, title, content, categoryIds });
  return res.status(status.CREATED).json(post);
};

module.exports = { validTitle, validContent, validCategoryIds, createPost };