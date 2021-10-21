const { StatusCodes } = require('http-status-codes');
const { BlogPost } = require('../models');
const service = require('../services/postService');

const createPost = async (req, res) => {
  const { id } = req.user;
  const { title, categoryIds, content } = req.body;
  const newPost = await service.createPost({ title, categoryIds, content });
  if (newPost) { 
    return res.status(newPost.status).json({ message: newPost.message });
  }
  const { dataValues } = await BlogPost.create({ title, content, categoryIds });
  return res.status(StatusCodes.CREATED).json({ ...dataValues, userId: id });
};

const getAllPosts = async (req, res) => {
  const getAll = await service.getAllPosts();
  return res.status(StatusCodes.OK).json(getAll);
};

module.exports = { 
  createPost,
  getAllPosts,
};
