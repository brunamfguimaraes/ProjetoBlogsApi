const express = require('express');
const rescue = require('express-rescue');
const { titleIsRequired, contentIsRequired } = require('../middleware/infoValidationPost');
const { categoryIdIsRequired } = require('../middleware/infoValidationPost');
const { idCategoryIsRequired } = require('../middleware/infoValidationPost');

const { tokenValidation } = require('../middleware/infoValidationUser');
const { createBlogPost, getAllBlogPosts } = require('../service/postService');

const router = express.Router();

router.post('/',
titleIsRequired,
contentIsRequired,
categoryIdIsRequired,
tokenValidation,
idCategoryIsRequired,
rescue(async (req, res) => {
    console.log(req.body);
    await createBlogPost(req, res);
}));

router.get('/',
rescue(async (req, res) => {
    console.log(req.body);
    await getAllBlogPosts(req, res);
}));

module.exports = router;