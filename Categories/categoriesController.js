const rescue = require('express-rescue');
const service = require('./categoriesService');

const create = rescue(async (req, res) => {
  const { name } = req.body;
  const newCategory = await service.create(name);
  res.status(201).json(newCategory);
});

module.exports = {
  create,
};
