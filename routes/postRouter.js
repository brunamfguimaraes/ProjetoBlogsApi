const express = require('express');

const postController = require('../controllers/postController');
const { validToken } = require('../api/auth/validToken');
const { validPost, validCategoryIds } = require('../middlewares/postValidations');

const router = express.Router();

router.route('/')
.post(validToken, validPost, validCategoryIds, postController.add);

module.exports = router;