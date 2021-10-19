const express = require('express');
const rescue = require('express-rescue');
const { titleIsRequired, contentIsRequired } = require('../middleware/infoValidationPost');
const { categoryIdIsRequired } = require('../middleware/infoValidationPost');
const { idCategoryIsRequired } = require('../middleware/infoValidationPost');

const { tokenValidation } = require('../middleware/infoValidationUser');
const { getAllBlogPosts, createBlogPost } = require('../service/postService');

const router = express.Router();

router.post('/',
titleIsRequired,
contentIsRequired,
categoryIdIsRequired,
tokenValidation,
idCategoryIsRequired,
rescue(async (req, res) => {
    await createBlogPost(req, res);
}));

router.get('/',
tokenValidation,
rescue(async (_req, res) => {
    console.log('controllerPostController');
    const data = await getAllBlogPosts();
    console.log('data', data, 'data PostController');
    return res.status(200).json(data);
}));

module.exports = router;