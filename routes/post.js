const express = require('express');

const router = express.Router();

// const middleware = require('../middlewares/post');
router.route('/')
    .get()
    .post();

router.route('/:id')
    .get()
    .put()
    .delete();

module.exports = router;