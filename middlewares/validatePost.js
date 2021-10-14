const { Category } = require('../models');

// retirado de: https://stackoverflow.com/questions/53606337/check-if-array-contains-all-elements-of-another-array
const checker = (arr, target) => target.every((v) => arr.includes(v));

const validatePost = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title) return res.status(400).json({ message: '"title" is required' });
  if (!content) return res.status(400).json({ message: '"content" is required' });
  if (!categoryIds) return res.status(400).json({ message: '"categoryIds" is required' });

  const categories = await Category.findAll({
    attributes: ['id'],
    raw: true,
  });

  const allCategories = categories.map((entry) => entry.id);
  const exists = checker(allCategories, categoryIds);

  if (!exists) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }
  
  return next();
};

module.exports = validatePost;