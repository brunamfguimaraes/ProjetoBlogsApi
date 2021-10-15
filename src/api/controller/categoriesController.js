const express = require('express');
require('dotenv').config();

const appCategories = express.Router();
const validateName = require('../middleware/validations/validationNewCategories');
const validateToken = require('../middleware/validations/validationToken');
const { createCategories } = require('../service/categoriesService');

appCategories.post('/', validateToken, validateName, async (req, res) => {
  const { name } = req.body;
  const result = await createCategories(name);
  return res.status(201).json(result);
});

module.exports = appCategories;
