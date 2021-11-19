const { Category } = require('../models');

const HTTP = {
  BadRequest: 400,
};

// https://stackoverflow.com/questions/53606337/check-if-array-contains-all-elements-of-another-array
const checker = (arr, target) => target.every((v) => arr.includes(v));

const validatePost = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title) return res.status(HTTP.BadRequest).json({ message: '"title" is required' });

  if (!content) return res.status(HTTP.BadRequest).json({ message: '"content" is required' });

  if (!categoryIds) { 
    return res.status(HTTP.BadRequest).json({ message: '"categoryIds" is required' });
  }

  const categories = await Category.findAll({
    attributes: ['id'],
    raw: true,
  });

  const allCategories = categories.map((entry) => entry.id);
  const exists = checker(allCategories, categoryIds);

  if (!exists) {
    return res.status(HTTP.BadRequest).json({ message: '"categoryIds" not found' });
  }

  return next();
};

module.exports = validatePost; 