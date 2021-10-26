const express = require('express');

const router = express.Router();

const validate = require('../validations/validateBlogPost');
const auth = require('../validations/validateToken');
const blogPostService = require('../services/blogPost');

router.post('/post',
validate.validateTitle,
validate.validateContent,
validate.validateCategoryId,
validate.validateIfCategoryIdExist,
auth.verifyToken,
async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.user;

    const addPost = await blogPostService.addNewPost(id, title, content);

    return res.status(201).json(addPost);
});

router.get('/post',
auth.verifyToken,
async (req, res) => {
    const posts = await blogPostService.getAllPosts();

    return res.status(200).json(posts);
});

router.get('/post/:id',
auth.verifyToken,
async (req, res) => {
    const { id } = req.params;

    const getPost = await blogPostService.getPostById(id);

    if (getPost.message) {
        return res.status(404).json(getPost);
    }

    return res.status(200).json(getPost);
});

router.put('/post/:id',
// validate.verifyFieldCategoriesIds,
auth.verifyToken,
validate.verifyIfIsRightUser,
validate.validateTitle,
validate.validateContent,
async (req, res) => {
    const { id } = req.params;
    const { title, content, categoriesIds } = req.body;
    console.log('id', id, 'title', title, 'content', content);

    const updatedPost = await blogPostService.updatePost(id, title, content, categoriesIds);

    if (updatedPost.message) {
        return res.status(200).json(updatedPost);
    }

    return res.status(200).json(updatedPost);
});

module.exports = router;
