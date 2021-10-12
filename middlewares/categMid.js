const { Categorie } = require('../models');

const verifyNameCateg = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  next();
};

const foundCateg = async (req, res, next) => {
  const { categoryIds } = req.body;
  if (!categoryIds) return res.status(400).json({ message: '"categoryIds" is required' });
  const find = categoryIds.map((id) => Categorie.findOne({ where: { id } }));
  const resolve = await Promise.all(find);
  const results = resolve.some((itens) => !itens);
  if (results) return res.status(400).json({ message: '"categoryIds" not found' });
  next();
};

module.exports = { verifyNameCateg, foundCateg };
