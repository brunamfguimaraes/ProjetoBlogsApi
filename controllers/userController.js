const express = require('express');

const router = express.Router();

const middlewares = require('../middlewares/validateUser');
const auth = require('../middlewares/validateToken');

const userService = require('../services/userService');

router.post('/user',
middlewares.validateEmail,
middlewares.validateIfEmailIsAlreadyExists,
middlewares.validateDisplayName,
middlewares.validatePassword,
async (req, res, next) => {
    const { displayName, email, password, image } = req.body;
    const addUser = await userService.addNewUser(displayName, email, password, image);

    const STATUS = 201;

    const infoUser = { email: addUser.email, STATUS };

    // return res.status(201).json(addUser);
    req.user = infoUser;

    next();
},
auth.validateToken);

router.post('/login',
middlewares.validateEmail,
middlewares.validatePassword,
async (req, res, next) => {
    const { email, password } = req.body;

    const login = await userService.loginIn(email, password);

    // console.log('aqui', login);
    if (login.message) {
        console.log('entrei aqui');
        return res.status(400).json(login);
    }

    const STATUS = 200;

    const infoUser = { email: login.email, STATUS };

    req.user = infoUser;

    next();
},
auth.validateToken);

router.get('/user',
auth.verifyToken,
async (req, res) => {
    const getUsers = await userService.getAllUsers();

    return res.status(200).json(getUsers);
});

router.get('/user/:id',
middlewares.verifyIfUserExists,
auth.verifyToken,
async (req, res) => {
    const { id } = req.params;

    const getUser = await userService.getUserById(id);

    return res.status(200).json(getUser);
});

module.exports = router;
