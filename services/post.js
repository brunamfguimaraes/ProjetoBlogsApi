const { BlogPost } = require('../models');

const createPost = async (req, res) => {
  const newPost = await BlogPost.create(req.body);
  return res.status(201).json(newPost);
};

module.exports = {
  createPost,
};
