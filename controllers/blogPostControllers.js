const JWT = require('jsonwebtoken');
const blogPostServices = require('../services/blogPostServices');

const createPost = async (req, res, next) => {
  const token = req.headers.authorization;
  const { id: userId } = JWT.decode(token);
  const newPost = await blogPostServices.createPost({ userId, ...req.body });
  if (newPost.message) return next(newPost);
  return res.status(201).json(newPost);
};

module.exports = {
  createPost,
};