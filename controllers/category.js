const { createCategory } = require('../services/category');

const status400 = 400;
const status201 = 201;
// const status200 = 200;

const postCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(status400).json({ message: '"name" is required' });
  }
  const result = await createCategory(name);
  return res.status(status201).json(result);
};

module.exports = {
  postCategory,
};