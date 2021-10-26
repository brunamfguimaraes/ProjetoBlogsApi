const express = require('express');
const { User } = require('../models');
require('dotenv/config');

const { validUser } = require('../middlewares/userMiddleware');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

const router = express.Router();

router.get('/', tokenMiddleware, async (_req, res) => {
  const allUsers = await User.findAll();
  return res.status(200).json(allUsers);
});

router.get('/:id', tokenMiddleware, async (req, res) => {
  const { id } = req.params;
  const userId = await User.findOne({ where: { id } });
  if (!userId) return res.status(404).json({ message: 'User does not exist' });
  return res.status(200).json(userId);
});

router.post('/', async (req, res) => {
  const message = validUser(req.body);
  if (message) return res.status(400).json({ message });
  const userExist = await User.findOne({ where: { email: req.body.email } });
  if (userExist) return res.status(409).json({ message: 'User already registered' });

  try {
    const newUser = await User.create(req.body);

    return res.status(201).json(newUser);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
});

router.delete('/me', tokenMiddleware, async (req, res) => {
  const { email } = req;
  await User.destroy({ where: { email } });
  return res.sendStatus(204);
});

module.exports = router;