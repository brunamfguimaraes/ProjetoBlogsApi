const express = require('express');
const { checkEmail, checkPassword, checkLoginInfo } = require('../middleware');
const tokenGenerator = require('../service/util/tokenGenerator');

const router = express.Router();

router.post('/', 
    checkEmail,
    checkPassword,
    checkLoginInfo, async (req, res) => res.status(200).send({ token: tokenGenerator(req.body) }));

module.exports = router;