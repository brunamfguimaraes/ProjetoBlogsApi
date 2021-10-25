const { StatusCodes } = require('http-status-codes');
const blogpostServices = require('../services/blogpostServices');

const createPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id: userId } = req.user;
    
    const response = await blogpostServices.createPost(title, content, categoryIds, userId);
    return res.status(StatusCodes.CREATED).json(response);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const response = await blogpostServices.getAll();
    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

module.exports = {
  createPost,
  getAll,
};