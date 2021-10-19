const express = require('express');

const { createNewUser, findAllUsers, findById, deleteUser } = require('../service/userService');
const { 
    checkDisplayName,
    checkEmail,
    checkIfUserExist,
    checkPassword,
    tokenValidation } = require('../middleware/index');

const router = express.Router();

router.get('/', tokenValidation, async (_req, res) => res.status(200).send(await findAllUsers()));

router.get('/:id', tokenValidation, async (req, res) => {
    const { id } = req.params;
    const userInfo = await findById(id);
    if (!userInfo) return res.status(404).send({ message: 'User does not exist' });
    return res.status(200).send(userInfo);
});

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

router.delete('/me', tokenValidation, (req, res) => deleteUser(req.user)
    .then(() => res.status(204).send()));

module.exports = router;