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
    console.log('token', addUserAndGetToken);

    // const STATUS = 201;

    // const infoUser = { email: addUser.email, STATUS };

    // return res.status(201).json(addUser);
    // req.user = infoUser;
    // const getToken = auth.validateToken(email);
    return res.status(201).json({ token: addUserAndGetToken });

    // next();
});

router.post('/login',
validate.validateEmail,
validate.validatePassword,
async (req, res) => {
    const { email, password } = req.body;

    const loginAndShowToken = await userService.loginIn(email, password);

    // console.log('aqui', login);
    if (loginAndShowToken.message) {
        console.log('entrei aqui');
        return res.status(400).json(loginAndShowToken);
    }

    // const STATUS = 200;

    // const infoUser = { email: login.email, STATUS };
    // console.log('info User', infoUser);

    // req.user = infoUser;
    // const getToken = await auth.validateToken(email);
    return res.status(200).json({ token: loginAndShowToken });

    // next();
});

router.get('/user',
auth.verifyToken,
async (req, res) => {
    // const token = req.headers.authorization;
    // console.log('O token aqui', token);

    // const validateToken = await auth.verifyToken(token);
    // console.log('validade 1', validateToken);
    // if (validateToken.message) {
    //     return res.status(401).json(validateToken);
    // }
    // console.log('validade 2', validateToken);

    const getUsers = await userService.getAllUsers();

    return res.status(200).json(getUsers);
});

router.get('/user/:id',
validate.verifyIfUserExists,
auth.verifyToken,
async (req, res) => {
    const { id } = req.params;

    // console.log(req.headers);
    // const token = req.headers.authorization;
    // console.log('O token aqui', token);

    // const validateToken = await auth.verifyToken(token);
    // console.log('validade 1', validateToken);
    // if (validateToken.message) {
    //     return res.status(401).json(validateToken);
    // }
    // console.log('validade 2', validateToken);

    const getUser = await userService.getUserById(id);

    return res.status(200).json(getUser);
});

module.exports = router;
