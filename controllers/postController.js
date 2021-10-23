const express = require('express');
const statusCode = require('http-status-codes');
/* const { BlogPost, Categorie } = require('../models'); */
const { createPost } = require('../services/postService');

const router = express.Router();

router.post('/post', async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const { id: userId } = req.user;
   
    const { id, message } = await createPost({ title, content, userId, categoryIds });
    /* console.log({ id, message }); */
    if (message) {
        return res.status(statusCode.BAD_REQUEST).json({
            message,
        });
    }

    return res.status(statusCode.CREATED).json({ 
        id,
        userId,
        title,
        content,
    });
});

module.exports = router;
