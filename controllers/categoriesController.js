const rescue = require('express-rescue');
const { Categorie } = require('../models');

const add = rescue(async (req, res) => {
  const { body } = req;
  const newCategory = await Categorie.create(body);
  res.status(201).json(newCategory);
});

module.exports = { add };