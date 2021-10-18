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
//       const { title, content } = req.body;
//         const { id } = req.params;

//         const updatedPost = await BlogPost.findOne({ where: id });
//         if (!updatedPost) {
//           res.status(401).json('Post not found');          
//         } else {
//           const updatedPost = await BlogPost.update({ title, content }, { where: { id } }, {
//             include: [                
//                 { model: Category, as: 'categories', through: { attributes: [] } },
//                 { attributes: { exclude: ['password'] } },
//             ],
//           });
//         }

//         res.status(200).json({ updatedPost }); 
//     } catch (error) {
//       res.status(500).json({ error });         
//     }
// });

// blogPostRouter.put('/:id', verifyToken, async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { title, content } = req.body;
//         const post = await BlogPost.findOne({ where: { id } });
//         if (!post) return res.status(400).json('Post not found');

//         if (title) post.title = title;
//         if (content) post.content = content;
//         const updatePost = await post.save();
//         res.status(200).json(updatePost);         
//     } catch (error) {
//         res.status(500).json({ error });         
//     }
//    });

// blogPostRouter.put('/:id', verifyToken, async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { title, content } = req.body;
//         const post = await BlogPost.findOne({ where: { id } });
//         console.log(post);
//         if (!post) return res.status(400).json('Post not found');

//         post.title = title;
//         post.content = content;
//         const updatePost = await post.save();
       
//         res.status(200).json(updatePost);         
//     } catch (error) {
//         res.status(500).json({ error });         
//     }
//    });

//  blogPostRouter.put('/:id', verifyToken, async (req, res) => {
//    try {
//      const { id } = req.params;
//      const { title, content } = req.body;
//      const post = await BlogPost.update({ title, content }, { where: { id }, returning: true });
//      console.log(post);
//      if (!post) return res.status(400).json('Post not found');

//       const updatePost = post[1][0].get();
      
//       res.status(200).json({ success: true, updatePost });         
//    } catch (error) {
//      res.status(500).json({ error });         
//    }
// });

module.exports = blogPostRouter;