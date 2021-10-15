const express = require('express');
const { BlogPost, PostsCategory } = require('../models');
const verifyToken = require('../middleware/verifyToken');
const blogPostValidate = require('../middleware/blogPostValidate');
const blogPostService = require('../services/blogPostService');

const blogPostRouter = express.Router();

blogPostRouter.post('/', verifyToken, blogPostValidate, async (req, res) => { 
    try {
    const { title, content, categoryIds } = req.body;  
    const { user } = req;    
    const categoryExists = await blogPostService.checkCategoryId(categoryIds);

    if (categoryExists.fieldError) {
        return res.status(400).json({ message: user.message });
    }

   const post = await BlogPost.create({ userId: user.id, title, content });
   const { id } = post;

   await categoryIds.forEach(async (categoryId) => {
       const postId = id;       
       await PostsCategory.create({ categoryId, postId });
   });   
   const { published, updated, ...postInfo } = post.dataValues;   

   res.status(201).json(postInfo);          
   } catch (error) {
      res.status(500).json({ error });
   }    
});
module.exports = blogPostRouter;