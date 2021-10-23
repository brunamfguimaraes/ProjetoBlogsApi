const { StatusCodes } = require('http-status-codes');
const { createPostServices, getAllPosts } = require('../services/postServices');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user;
  try {
    const response = await createPostServices({ title, content, categoryIds, id });
    if (response.isError) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: response.message });
    } 
    return res.status(StatusCodes.CREATED).json(response);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const getPost = async (req, res) => {
  try {
    const response = await getAllPosts();
    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

module.exports = { createPost, getPost };