const express = require('express');

const router = express.Router();

const middleware = require('../middlewares/user');
const controller = require('../controllers/users');

router.route('/')
    .get()
    .post(
        middleware.displayNameVerify,
        middleware.existEmail,
        middleware.Email,
        middleware.Password,
        middleware.passwordLen,
        middleware.uniqueEmail,
        controller.create,
    );

router.route('/:id')
    .get();

    router.route('/user/me')
    .delete();

module.exports = router;