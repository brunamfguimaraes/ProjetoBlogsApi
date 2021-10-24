const { Categories } = require('../models');

const checkContainArr = (arr, target) => target.every((v) => arr.includes(v));

const validPost = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title) return res.status(400).json({ message: '"title" is required' });
  if (!content) return res.status(400).json({ message: '"content" is required' });
  if (!categoryIds) return res.status(400).json({ message: '"categoryIds" is required' });

  const allCaregories = await Categories.findAll({ attributes: ['id'], raw: true });
  const mapCategories = allCaregories.map((e) => e.id);
  const categories = checkContainArr(mapCategories, categoryIds);
  if (!categories) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }
  return next();
};

module.exports = validPost;
