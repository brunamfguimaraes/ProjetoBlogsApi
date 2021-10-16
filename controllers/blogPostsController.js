const express = require('express');
const rescue = require('express-rescue');
const { StatusCodes } = require('http-status-codes');

const postsRouter = express.Router();

const validateJWT = require('../middlewares/validateJWT');
const validateBlogPosts = require('../middlewares/blogPostValidate');
const { createBlogPost, checkCategory } = require('../services/blogPostsService');
const { getUser } = require('../services/userService');

postsRouter.post('/',
  validateJWT,
  validateBlogPosts,
  rescue(async (req, res) => {
   const { title, content, categoryIds } = req.body;
   const { payload: { email } } = req.user;
   const { id: idUser } = await getUser(email);
   const idCategory = await checkCategory(categoryIds);
   if (idCategory.isError) {
     return res.status(idCategory.code).json({ message: idCategory.message });
   }
   const posts = await createBlogPost(title, content, idUser);
   res.status(StatusCodes.CREATED).json(posts);
 }));

 module.exports = postsRouter;