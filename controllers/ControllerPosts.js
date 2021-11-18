const { StatusCodes } = require('http-status-codes');

const ServicePosts = require('../services/ServicePosts');

const create = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id: userId } = req.user;

    const newCategory = await ServicePosts.create({ title, content, categoryIds }, userId);

    return res.status(StatusCodes.CREATED).json(newCategory);
  } catch (error) {
    next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const getAllBlogPost = await ServicePosts.getAll();

    return res.status(StatusCodes.OK).json(getAllBlogPost);
  } catch (error) {
    return next(error);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await ServicePosts.getPostById(id);

    return res.status(StatusCodes.OK).json(post);
  } catch (error) {
    return next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const { id: userId } = req.user;

    const upatedPost = await ServicePosts
      .updatePost({ title, content }, id, userId);

    return res.status(StatusCodes.OK).json(upatedPost);
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;

    await ServicePosts.deletePost(id, userId);

    return res.status(StatusCodes.NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getPostById,
  updatePost,
  deletePost,
};
