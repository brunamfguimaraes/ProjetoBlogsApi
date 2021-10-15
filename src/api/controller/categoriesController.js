const express = require('express');
require('dotenv').config();

const appCategories = express.Router();
const validateName = require('../middleware/validations/validationNewCategories');
const validateToken = require('../middleware/validations/validationToken');
const { createCategories, getAll } = require('../service/categoriesService');

appCategories.post('/', validateToken, validateName, async (req, res) => {
  const { name } = req.body;
  const result = await createCategories(name);
  return res.status(201).json(result);
});

appCategories.get('/', validateToken, async (req, res) => {
  const resultAll = await getAll();
  return res.status(200).json(resultAll);
});

module.exports = appCategories;
