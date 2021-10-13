const express = require('express');

const router = express.Router();
const userService = require('../services/userService');

router.post('/user', async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    
    const newUser = await userService.createUser(displayName, email, password, image);

    if (newUser.message) {
      res.status(newUser.status).json({ message: newUser.message });
    }

    res.status(201).json(newUser);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = router;
