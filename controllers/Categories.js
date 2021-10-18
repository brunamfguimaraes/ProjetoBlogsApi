const express = require('express');

const { CREATED, SUCCESS } = require('../utils/statusCode');
const Categories = require('../services/Categories');
const tokenValidator = require('../middlewares/tokenValidator');
const categoriesValidator = require('../middlewares/categoriesValidator');

const router = express.Router();

router.post('/',
  tokenValidator.validateToken,
  categoriesValidator.validateCategory,
  async (req, res) => {
    const category = await Categories.create(req.body);

    return res.status(CREATED).json(category);
  });

router.get('/',
  tokenValidator.validateToken,
  async (_req, res) => {
    const categories = await Categories.findAll();

    return res.status(SUCCESS).json(categories);
  });

module.exports = router;