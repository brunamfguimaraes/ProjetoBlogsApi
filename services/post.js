require('dotenv');

const jwt = require('jsonwebtoken');
const { BlogPost } = require('../models');
const { Category } = require('../models');
const { User } = require('../models');

const verifyTitle = (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) {
      res.status(400).json({ message: '"title" is required' });
    }
    next();
  } catch (error) {
    return { message: '"title" is required' };
  }
};

const verifyContent = (req, res, next) => {
  try {
    const { content } = req.body;
    if (!content) {
      res.status(400).json({ message: '"content" is required' });
    }
    next();
  } catch (error) {
    return { message: '"content" is required' };
  }
};

const verifyCategoryId = (req, res, next) => {
  try {
    const { categoryIds } = req.body;
    if (!categoryIds || categoryIds.length === 0) {
      res.status(400).json({ message: '"categoryIds" is required' });
    }
    next();
  } catch (error) {
    return { message: '"categoryIds" is required' };
  }
};

const verifyCategoryIdExists = async (req, res, next) => {
  const categoriesId = await Category.findAll();
  try {
    const { categoryIds } = req.body;

    const verificacao = categoryIds.every((data1) => categoriesId
      .some((data2) => data1 === data2.id));

    if (!verificacao) {
      res.status(400).json({ message: '"categoryIds" not found' });
    }
    next();
  } catch (error) {
    return { message: '"categoryIds" is required' };
  }
};

const getTokenData = (token) => {
  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  return id;
};

const createBlogPost = async (req, res) => {
  const usuario = getTokenData(req.headers.authorization);
  try {
    const newBlogPost = await BlogPost.create(
      { title: req.body.title, content: req.body.content, userId: usuario },
    );
    const { id, title, content, userId } = newBlogPost;
    
    return res.status(201).json({ id, userId, title, content });
  } catch (error) {
    res.status(400).json({ message: 'erro' });
  }
};
const getAllPosts = async (_req, res) => {
  const result = await BlogPost.findAll({ 
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } }],
  });
  return res.status(200).json(result);
};

module.exports = { verifyCategoryId,
  verifyContent,
  verifyTitle,
  verifyCategoryIdExists,
  createBlogPost,
  getAllPosts,
};