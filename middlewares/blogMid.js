const { BlogPost } = require('../models');

const VerifyTitle = (req, res, next) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: '"title" is required' });
  next();
};

const VerifyContent = (req, res, next) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ message: '"content" is required' });
  next();
};

const VerifyBlog = async (req, res, next) => {
  const { id } = req.params;
  const item = await BlogPost.findOne({ where: { id } });
  if (!item) return res.status(404).json({ message: 'Post does not exist' });
  next();
};

module.exports = { VerifyTitle, VerifyContent, VerifyBlog };