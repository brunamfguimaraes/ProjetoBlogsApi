const express = require('express');

const router = express.Router();

const middleware = require('../middlewares/categories');
const token = require('../middlewares/token');
const controller = require('../controllers/categories');

router.use(
    token.haveToken,
    token.validToken,
    );

router.route('/')
    .get(controller.getAll)
    .post(
        middleware.haveName,
        controller.create,
    );

module.exports = router;