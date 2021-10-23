const express = require('express');
const validateToken = require('../validations/validateJWT');

const router = express.Router();
// const { User } = require('../models');
const NewUser = require('../services/userService');

router.post('/', async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const newUser = await NewUser.create(displayName, email, password, image);

    if (newUser.message === 'User already registered') return res.status(409).json(newUser);
    if (typeof newUser.message === 'string') return res.status(400).json(newUser);
    
    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.get('/', validateToken, async (req, res) => {
  try {
    const getUsers = await NewUser.getAllUsers();

    return res.status(200).json(getUsers);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;