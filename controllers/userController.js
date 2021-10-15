const express = require('express');
const jwt = require('jsonwebtoken');
const service = require('../services/userService');

const secret = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '7d',
};

const router = express.Router();

router.post('/', async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const result = await service.postNewUser(displayName, email, password, image);
  if (result.err) {
    const { err } = result;
    return res.status(result.status).json(err);
  }
  const token = jwt.sign({ data: result }, secret, jwtConfig);
  res.status(201).json({ token });
});

// ...

module.exports = router;