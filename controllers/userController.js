require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const messages = require('../helpers/validationMessages');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

const jwtConfig = {
  expiresIn: '5d',
  algorithm: 'H256',
};

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    await User.create({ displayName, email, password, image });

    const userSearch = await User.findOne({ where: { email } });

    const { id } = userSearch;

    const userWithoutPassword = {
      id,
      displayName,
      email,
      image,
    };

    const token = jwt.sign({ data: userWithoutPassword }, JWT_SECRET, jwtConfig);

    return res.status(201).json({ token });
  } catch (e) {
    console.log(e);
    res.status(500).json(messages.ERROR);
  }
});

module.exports = router;