const express = require('express');

const { createNewUser, findAllUsers } = require('../service/userService');
const { 
    checkDisplayName,
    checkEmail,
    checkIfUserExist,
    checkPassword,
    tokenValidation } = require('../middleware/index');

const router = express.Router();

router.get('/', tokenValidation, async (_req, res) => res.status(200).send(await findAllUsers()));

router.post('/', 
    checkDisplayName, 
    checkEmail,
    checkIfUserExist,
    checkPassword,
    async (req, res) => {
    const { displayname, email, password, image } = req.body;
    const newUserInfo = { displayname, email, password, image };
    return res.status(201).send({ token: await createNewUser(newUserInfo) });
});

module.exports = router;