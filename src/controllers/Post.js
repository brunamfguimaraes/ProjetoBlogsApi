const service = require('../services/Post');

const createPost = async (req, res) => {
  try {
    const { id } = req.user;

    const post = req.body;

    const newPost = await service.createPost(id, post);

    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const getAllPosts = async (_req, res) => {
  try {
    const allPosts = await service.getAllPosts();

    return res.status(200).json(allPosts);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
};
