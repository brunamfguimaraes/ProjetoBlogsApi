const express = require('express');
require('dotenv').config();

const router = express.Router();
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const { JWT_SECRET } = process.env;

router.post('/', async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    
    const newUser = await userService.createUser(displayName, email, password, image);

    if (newUser.message) {
      res.status(newUser.status).json({ message: newUser.message });
    }

    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
  
    delete newUser.password; 
  
    const token = jwt.sign({ data: newUser }, JWT_SECRET, jwtConfig);
  
    return res.status(201).json({ token });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = router;
