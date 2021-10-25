const express = require('express');
const userService = require('../services/userService');
const { User } = require('../models');
const auth = require('../auth/jwtFunctions');
const { authValidation } = require('../auth/authMiddleware');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    if (newUser.erro) {
      return res.status(newUser.erro.code).json({ message: newUser.erro.message });
    }

    const token = auth.createJWT(newUser);
    return res.status(201).json({ token });
  } catch (e) {
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

router.get('/', authValidation, async (_req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get('/:id', authValidation, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user === null) { 
      return res.status(404).send({ message: 'User does not exist' }); 
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;