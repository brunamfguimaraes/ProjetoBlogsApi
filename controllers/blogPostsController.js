const blogpostsServices = require('../services/blogpostsServices');
require('dotenv');

const createPost = async (req, res, next) => {
  try {
    const { user } = req;
    const postData = { ...req.body, userId: user.id };
    const newPost = await blogpostsServices.createPost(postData);
    if (newPost.error) return next(newPost);
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    next(500);
  }
};

const getAllPosts = async (_req, res, next) => {
  try {
    const posts = await blogpostsServices.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    next(500);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await blogpostsServices.getPostById(id);
    if (post.error) return next(post);
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    next(500);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const {
      params: { id: paramsId },
    } = req;
    const postData = { ...req.body, paramsId };
    const post = await blogpostsServices.updatePost(postData);
    if (post.error) return next(post);
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    next(500);
  }
};

const deletePost = async (req, res, next) => {
  try {
    await blogpostsServices.deletePost(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.log(error);
    next(500);
  }
};

module.exports = { 
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
// getAll (findAll) - OK
// getById (findOne) - OK
// create (create) - OK
// update (update) - OK
// remove (destroy) - OK