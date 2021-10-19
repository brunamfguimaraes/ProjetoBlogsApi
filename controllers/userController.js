const express = require('express');

const router = express.Router();

const middlewares = require('../middlewares/validateUser');

const userService = require('../services/userService');

router.post('/user',
middlewares.validateEmail,
middlewares.validateIfEmailIsAlreadyExists,
middlewares.validateDisplayName,
middlewares.validatePassword,
async (req, res) => {
    const { displayName, email, password, image } = req.body;
    const addUser = await userService.addNewUser(displayName, email, password, image);

    return res.status(201).json(addUser);
});

module.exports = router;
