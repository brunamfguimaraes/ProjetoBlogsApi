const express = require('express');

const router = express.Router();

const middleware = require('../middlewares/login');

router.route('/')
    .post()

module.exports = router;