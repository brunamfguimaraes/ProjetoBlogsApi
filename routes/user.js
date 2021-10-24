const express = require('express');
const router = express.Router();

const middleware = require('../middlewares/user');
const controller = require('../controllers/users');

router.route('/')
    .get()
    .post(
        middleware.displayName,
        middleware.existEmail,
        middleware.email,
        middleware.password,
        middleware.passwordLen,
        middleware.uniqueEmail,
        controller.create
    )

router.route('/:id')
    .get()

    router.route('/user/me')
    .delete()

module.exports = router;