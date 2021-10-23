const { CREATED, INTERNAL_SERVER_ERROR, OK } = require('http-status');
const { create, getAllPosts } = require('../services/BlogPost');

const createPost = async (req, res) => {
  try {
    const post = await create(req.body, req.user);
    if (post.err) {
      return res.status(post.err.status).json({ message: post.err.message });
    }
    res.status(CREATED).json(post);
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

const getPosts = async (_req, res) => {
  try {
    const posts = await getAllPosts();
    res.status(OK).json(posts);
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

module.exports = {
  createPost,
  getPosts
};