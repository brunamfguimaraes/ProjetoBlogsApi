const JWT = require('jsonwebtoken');
const blogPostServices = require('../services/blogPostServices');
const { BlogPost, User, Category } = require('../models');

const createPost = async (req, res, next) => {
  const token = req.headers.authorization;
  const { id: userId } = JWT.decode(token);
  const newPost = await blogPostServices.createPost({ userId, ...req.body });
  if (newPost.message) return next(newPost);
  return res.status(201).json(newPost);
};

const getPosts = async (_req, res) => {
  const posts = await BlogPost
  .findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['number'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
  return res.status(200).json(posts);
};

module.exports = {
  createPost,
  getPosts,
};