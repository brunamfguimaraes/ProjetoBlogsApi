// const { Categorie } = require('../models');

const verifyNameCateg = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  next();
};

const foundCateg = async (req, res, next) => {
  const { categoryIds } = req.body;
  if (!categoryIds) return res.status(400).json({ message: '"categoryIds" is required' });

  next();
};

module.exports = { verifyNameCateg, foundCateg };

// categoryIds.forEach(async (id) => {
//   const search = await Categorie.findOne({ where: { id } });
//   if (search === null) { categExists = false; }
// });