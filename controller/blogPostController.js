const express = require('express');
const { BlogPost } = require('../models');
const verifyToken = require('../middleware/verifyToken');

const blogPostRouter = express.Router();

blogPostRouter.post('/', verifyToken, async (req, res) => {  
    const { title, content } = req.body;
    console.log(title, content);
    // const { user } = req;
    const { user } = req;

   const post = await BlogPost.create({ userId: user.id, title, content });
   const { published, updated, ...postInfo } = post.dataValues;
    console.log(post);

    res.status(201).json(postInfo);  
});

module.exports = blogPostRouter;