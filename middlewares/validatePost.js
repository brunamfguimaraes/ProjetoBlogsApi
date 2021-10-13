const { Category } = require('../models');

const validatePost = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title) return res.status(400).json({ message: '"title" is required' });
  if (!content) return res.status(400).json({ message: '"content" is required' });
  if (!categoryIds) return res.status(400).json({ message: '"categoryIds" is required' });
  categoryIds.forEach(async (category) => {
    const exists = await Category.findOne({ where: { id: category } });
    if (!exists) return res.status(400).json({ message: '"categoryIds" not found' });
  });

  return next();
};

module.exports = validatePost;