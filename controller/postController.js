const express = require('express');
const { 
    checkCategoryId,
    tokenValidation,
    checkPostTitleAndContent,
    checkPostId,
    checkPostUserId,
    blockCategoriesFromBeingEdited } = require('../middleware');

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

router.get('/:id', tokenValidation, checkPostId, 
  (req, res) => {
    const { id } = req.params;
    blogPostService.getPostById(id)
      .then((data) => res.status(200).send(data));
});

router.put('/:id', 
    tokenValidation,
    checkPostUserId,
    checkPostTitleAndContent,
    blockCategoriesFromBeingEdited,
    (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params;
    blogPostService.updatePost({ content, title, id }).then((data) => res.status(200).send(data));
});

router.delete('/:id', 
    tokenValidation,
    checkPostId,
    checkPostUserId,
    (req, res) => {
      const { id } = req.params;
      blogPostService.deletePost(id).then(() => res.status(204).send());
});

module.exports = router;