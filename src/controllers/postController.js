const { INTERNAL_SERVER_ERROR, BAD_REQUEST, CREATED } = require('http-status');

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

module.exports = {
  createPost,
};