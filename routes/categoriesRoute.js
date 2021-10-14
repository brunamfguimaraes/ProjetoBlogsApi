const express = require('express');

const { validateJWT } = require('../middlewares/tokenJwt');

const router = express.Router();

router.post('/', validateJWT, (req, res) => res.status(201));

module.exports = router;
