const express = require('express');
const router = express.Router();

const middleware = require('../middlewares/user');

router.route('/')
    .get()
    .post()

router.route('/:id')
    .get()

    router.route('/user/me')
    .delete()

module.exports = router;