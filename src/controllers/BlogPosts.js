const { INTERNAL_SERVER_ERROR, BAD_REQUEST, CREATED } = require('http-status');

const blogPostService = require('../services/BlogPosts');

const createBlogPost = async (req, res) => {
  try {
    const { title, categoryIds, content } = req.body;
    const { userId } = req.user;

    const result = await blogPostService.createBlogPost({ title, categoryIds, content, userId });
    
    return result.message
    ? res.status(BAD_REQUEST).json(result)
    : res.status(CREATED).json(result);
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = {
  createBlogPost,
}; 