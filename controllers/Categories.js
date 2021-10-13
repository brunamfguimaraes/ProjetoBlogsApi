const express = require('express');

const { CREATED } = require('../utils/statusCode');
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

module.exports = router;