const express = require('express');
const { Category } = require('../models');
const { valdateJwt, validateCategorieName } = require('../midlewares');

const router = express.Router();
const ALGO_DEU_ERRADO = 'Algo deu errado';

router.get('/', valdateJwt, async (_req, res) => {
  try {
    const categories = await Category.findAll();
    return res.status(200).json(categories);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: ALGO_DEU_ERRADO });
  }
});

router.post('/', valdateJwt, validateCategorieName, async (req, res) => {
  try {
    const { dataValues: { name } } = await Category.create(req.body);
    return res.status(201).json({ name });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: ALGO_DEU_ERRADO });
  }
});

module.exports = router;
