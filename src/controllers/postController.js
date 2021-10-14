const { INTERNAL_SERVER_ERROR, BAD_REQUEST, CREATED, OK } = require('http-status');

const blogPostService = require('../services/blogPostService');

const createPost = async (req, res) => {
  try {
    const { title, categoryIds, content } = req.body;
    const { id: userId } = req.userId;

    const result = await blogPostService.createPost({ title, categoryIds, content, userId });
    if (result.message) return res.status(BAD_REQUEST).json(result);

    return res.status(CREATED).json(result);
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const result = await blogPostService.getAllPosts();

    return res.status(OK).json(result);
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message }); 
  }
};

module.exports = {
  createPost,
  getAllPosts,
};