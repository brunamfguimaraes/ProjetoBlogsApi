const express = require('express');
const { checkCategoryId, tokenValidation, checkPostTitleAndContent } = require('../middleware');
const blogPostService = require('../service/blogPostService');

const router = express.Router();

router.post('/',
    checkCategoryId,
    checkPostTitleAndContent,
    tokenValidation,
    (req, res) => {
      const { content, title } = req.body;
    blogPostService.createBlogPost({ title, content, userId: req.user })
        .then((postInfo) => res.status(201).send(postInfo.dataValues));
});

router.get('/', tokenValidation, (_req, res) => {
    blogPostService.getAllPosts().then((data) => res.status(200).send(data));
});

module.exports = router;