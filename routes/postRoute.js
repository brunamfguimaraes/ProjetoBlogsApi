const express = require('express');
const { creatPost } = require('../controller/BlogPost');
const { validateFildsBlogPost, validateCategory } = require('../middlewares/validationBlogPost');
const { validateJWT } = require('../middlewares/validationToken');

const router = express.Router();

router.route('/')
 .post(validateFildsBlogPost, validateJWT, validateCategory, creatPost);

module.exports = router;