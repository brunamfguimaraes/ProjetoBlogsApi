const express = require('express');

const postController = require('../controllers/postController');
const { validToken } = require('../api/auth/validToken');
// const { validPost } = require('../middlewares/postValidations');
// validCategoryIds
const router = express.Router();
// validCategoryIds, validPost
router.route('/')
.post(validToken, postController.add)
.get(validToken, postController.findAll);

module.exports = router;