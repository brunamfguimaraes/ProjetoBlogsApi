const express = require('express');
const { BlogPost, PostsCategory, User, Category } = require('../models');
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

blogPostRouter.get('/', verifyToken, async (req, res) => {
    try {
        const post = await BlogPost.findAll({
          include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
            { model: Category, as: 'categories', through: { attributes: [] } },
          ],
    });
    
    return res.status(200).json(post);        
    } catch (error) {
        res.status(500).json({ error });        
    }
});

blogPostRouter.get('/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;

        const post = await blogPostService.checkBlogPost(id);

        if (post.fieldError) {
            return res.status(404).json({ message: post.message });
        }

        const postBlog = await BlogPost.findByPk(id, {
            include: [
                { model: User, as: 'user', attributes: { exclude: ['password'] } },
                { model: Category, as: 'categories', through: { attributes: [] } },
            ],
        });
    
      return res.status(200).json(postBlog);            
    } catch (error) {
        res.status(500).json({ error });        
    }
});

// blogPostRouter.put('/', verifyToken, async (req, res) => {
//     try {
//         const 
        
//     } catch (error) {
        
//     }
// })

module.exports = blogPostRouter;