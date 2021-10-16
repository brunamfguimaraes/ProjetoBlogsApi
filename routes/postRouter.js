const express = require('express');

const postController = require('../controllers/postController');
const { validToken } = require('../api/auth/validToken');
const { validPost, validCategoryIds } = require('../middlewares/postValidations');

const router = express.Router();
// , postController.add
router.route('/')
.post(validToken, validPost, validCategoryIds)
.get(validToken, postController.findAll);

module.exports = router;