const express = require('express');

const { createNewUser } = require('../service/userService');
const { 
    checkDisplayName,
    checkEmail,
    checkIfUserExist,
    checkPassword } = require('../middleware/index');

const router = express.Router();

// router.get('/', async (_req, res) => { 
//     return res.status(200).send(await findAllUsers());
// });

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