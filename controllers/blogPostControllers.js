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

const getPostById = async (req, res, next) => {
  const { id } = req.params;
  const post = await blogPostServices.getPostById(id);
  if (post.message) return next(post);
  return res.status(200).json(post);
};

const updatePost = async (req, res, next) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const { id: userId } = JWT.decode(token);
  const updatedPost = await blogPostServices.updatePost(id, userId, req.body);
  if (updatedPost.message) return next(updatedPost);
  return res.status(200).json(updatedPost);
};

const deletePost = async (req, res, next) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const { id: userId } = JWT.decode(token);
  const deletedPost = await blogPostServices.deletePost(id, userId);
  if (deletedPost.message) return next(deletedPost);
  return res.status(204).end();
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
};