const express = require('express');
// const { json } = require('sequelize/types');

const router = express.Router();
// const { User } = require('../models');
const NewUser = require('../services/userService');

router.post('/', async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    // if (email) {
    //   const emailExists = await User.findAll({ where: {
    //     email,
    //   } });
    //   if (emailExists) return res.status(409).json({ message: 'User already registered' });
    // }
    const newUser = await NewUser.create(displayName, email, password, image);
    // console.log('newUser', newUser);
    if (newUser.message === 'User already registered') return res.status(409).json(newUser);
    if (typeof newUser.message === 'string') return res.status(400).json(newUser);
    
    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;