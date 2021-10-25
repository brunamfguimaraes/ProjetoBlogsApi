const express = require('express');

const router = express.Router();

const validate = require('../validations/validateUser');
const auth = require('../validations/validateToken');

const userService = require('../services/userService');

router.post('/user',
validate.validateEmail,
validate.validateDisplayName,
validate.validatePassword,
validate.validateIfEmailIsAlreadyExists,
async (req, res) => {
    const { displayName, email, password, image } = req.body;
    const addUserAndGetToken = await userService.addNewUser(displayName, email, password, image);

    return res.status(201).json({ token: addUserAndGetToken });
});

router.post('/login',
validate.validateEmail,
validate.validatePassword,
async (req, res) => {
    const { email, password } = req.body;

    const loginAndShowToken = await userService.loginIn(email, password);

    if (loginAndShowToken.message) {
        console.log('entrei aqui');
        return res.status(400).json(loginAndShowToken);
    }

    return res.status(200).json({ token: loginAndShowToken });
});

router.get('/user',
auth.verifyToken,
async (req, res) => {
    const getUsers = await userService.getAllUsers();

    return res.status(200).json(getUsers);
});

router.get('/user/:id',
validate.verifyIfUserExists,
auth.verifyToken,
async (req, res) => {
    const { id } = req.params;

    const getUser = await userService.getUserById(id);

    return res.status(200).json(getUser);
});

module.exports = router;
