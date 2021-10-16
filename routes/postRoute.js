const express = require('express');
const { validateFildsBlogPost, validateCategory } = require('../middlewares/validationBlogPost');
const { validateJWT } = require('../middlewares/validationToken');

const router = express.Router();

router.route('/')
 .post(validateFildsBlogPost, validateJWT, validateCategory);

module.exports = router;