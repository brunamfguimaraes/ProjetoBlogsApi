const express = require('express');
const statusCode = require('http-status-codes');
/* const jwt = require('jsonwebtoken'); */
const { BlogPost } = require('../models');
/* const { createCategory } = require('../services/categoriesService'); */

const router = express.Router();

router.post('/post', async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const post = await BlogPost.create({ 
        title,
        content, 
        categoryIds,
        include: [{ model: 'Categorie', as: 'Category' }] });
    console.log(post);    
    return res.status(statusCode.CREATED).json(post);
});

module.exports = router;
