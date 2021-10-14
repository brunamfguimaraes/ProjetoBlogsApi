const express = require('express');

const postController = require('../controllers/postController');
// const { validToken } = require('../api/auth/validToken');
// const { validPost } = require('../middlewares/postValidations');

const router = express.Router();

router.route('/')
.post(postController.add);

module.exports = router;