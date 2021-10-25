const express = require('express');

const router = express.Router();

const middleware = require('../middlewares/categories');
const token = require('../middlewares/token');
const controller = require('../controllers/categories');

router.route('/')
    .get()
    .post(
        token.haveToken,
        token.validToken,
        middleware.haveName,
        controller.create,
    );

module.exports = router;