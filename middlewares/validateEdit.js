const { User, BlogPost } = require('../models');

const validateEdit = async (req, res, next) => {
  const { id } = req.params;
  const { title, content, categoryIds } = req.body;
  const { email } = req;
  const user = await User.findOne({ where: { email } });
  const post = await BlogPost.findOne({ where: { id } });
  if (post.userId !== user.id) return res.status(401).json({ message: 'Unauthorized user' });
  if (!title) return res.status(400).json({ message: '"title" is required' });
  if (!content) return res.status(400).json({ message: '"content" is required' });
  if (categoryIds) return res.status(400).json({ message: 'Categories cannot be edited' });
  return next();
};

module.exports = validateEdit;