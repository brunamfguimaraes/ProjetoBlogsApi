const {
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  CREATED,
  OK,
  NOT_FOUND,
  UNAUTHORIZED, 
  NO_CONTENT } = require('http-status');

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

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await blogPostService.getPostById(id);

    if (result.message) return res.status(NOT_FOUND).json(result);

    return res.status(OK).json(result);
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message }); 
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id: postId } = req.params;
    const { userId } = req;

    const result = await blogPostService.updatePost(
      { title, content, postId, userId, categoryIds },
    );

    if (result.message && result.unauthorized) return res.status(UNAUTHORIZED).json(result);
    if (result.message) return res.status(BAD_REQUEST).json(result);

    return res.status(OK).json(result);
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });  
  }
};

const removePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const { userId } = req;

    const result = await blogPostService.removePost({ postId, userId });

    if (result.message && result.unauthorized) return res.status(UNAUTHORIZED).json(result);
    if (result.message) return res.status(NOT_FOUND).json(result);

    return res.status(NO_CONTENT).send();
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });  
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  removePost,
};