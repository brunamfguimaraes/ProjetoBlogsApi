const express = require('express');
const jwt = require('jsonwebtoken');
const service = require('../services/categoryService');

const secret = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '7d',
};

const router = express.Router();

router.post('/', async (req, res) => {
  const { name } = req.body;
  const result = await service.createCategory(name);
  if (result.err) {
    const { err, status } = result;
    return res.status(status).json(err);
  }
  res.status(201).json(result);
});

module.exports = router;