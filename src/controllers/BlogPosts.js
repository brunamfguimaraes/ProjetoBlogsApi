const { INTERNAL_SERVER_ERROR, BAD_REQUEST, CREATED, OK } = require('http-status');

const BlogPosts = require('../services/BlogPosts');

const createBlogPost = async (req, res) => {
  try {
    const { title, categoryIds, content } = req.body;
    const { userId } = req.user;

    const result = await BlogPosts.createBlogPost({ title, categoryIds, content, userId });
    
    return result.message
    ? res.status(BAD_REQUEST).json(result)
    : res.status(CREATED).json(result);
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const getAllBlogPosts = async (_req, res) => {
  try {
    const result = await BlogPosts.getAllBlogPosts();

    return res.status(OK).json(result);
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message }); 
  }
};

module.exports = {
  createBlogPost,
  getAllBlogPosts,
}; 