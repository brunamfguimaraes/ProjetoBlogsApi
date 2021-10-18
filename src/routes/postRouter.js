const express = require('express');

const postController = require('../controllers/postController');
const { validateJWT } = require('../middlewares/tokenJWT');
const validationBlogPost = require('../middlewares/validations/blogPost');
const categoryIdExists = require('../middlewares/validations/existsCategoryIds');

const router = express.Router();

router.post('/', validateJWT, validationBlogPost, categoryIdExists, postController);

module.exports = router;
