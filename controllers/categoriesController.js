const rescue = require('express-rescue');
const { Categorie } = require('../models');

const add = rescue(async (req, res) => {
  const { body } = req;
  const newCategory = await Categorie.create(body);
  return res.status(201).json(newCategory);
});

const findAll = rescue(async (req, res) => {
  const findCategory = await Categorie.findAll();
  return res.status(200).json(findCategory);
});

module.exports = { add, findAll };