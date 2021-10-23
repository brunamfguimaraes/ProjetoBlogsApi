const express = require('express');
const userService = require('../services/userService');
const auth = require('../auth/jwtFunctions');

const router = express.Router();

router.post('/', async (req, res) => {
  const { displayName, email, password, image } = req.body;
  console.log(req.body);
  console.log(displayName, email, password, image);

  try {
    const newUser = await userService.createUser(req.body);
    const token = auth.createJWT(newUser.email);
    return res.status(201).json({ token });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = router;