const { BlogPost } = require('../models');

const creatPost = async (req, res) => {
  const { id } = req.userId;
  const { title, content } = req.body;
  const createNewPost = await BlogPost.create({ id, title, content });
  res.status(201).json(createNewPost);
};

module.exports = {
  creatPost,
};