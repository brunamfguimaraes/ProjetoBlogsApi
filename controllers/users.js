const express = require('express');
const { User } = require('../models');

const router = express.Router();

// GET /book
router.get('/', async (_req, res) => {
  try {
    const users = await User.findAll();

    return res.status(200).json(users);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = router;