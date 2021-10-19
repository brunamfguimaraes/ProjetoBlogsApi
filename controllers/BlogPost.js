const { CREATED, INTERNAL_SERVER_ERROR } = require('http-status');
const { create } = require('../services/BlogPost');

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

module.exports = {
  createPost,
};