const express = require('express');

const router = express.Router();

const middleware = require('../middlewares/post');
const token = require('../middlewares/token');
const controller = require('../controllers/post');

router.route('/')
    .get()
    .post(
        token.haveToken,
        token.validToken,
        middleware.haveFields,
        middleware.haveCategory,
        controller.create,
    );

router.route('/:id')
    .get()
    .put()
    .delete();

module.exports = router;