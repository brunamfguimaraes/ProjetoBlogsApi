const express = require('express');

const router = express.Router();

const middleware = require('../middlewares/login');
const controller = require('../controllers/login');

router.route('/')
    .post(
        middleware.blankEmail,
        middleware.blankPass,
        middleware.existEmail,
        middleware.existPassword,
        middleware.existUser,
        controller.login,
    );

module.exports = router;