const express = require('express');

const router = express.Router();

router.route('/')
    .get()
    .post()

router.route('/:id')
    .get()

    router.route('/user/me')
    .delete()

module.exports = router;