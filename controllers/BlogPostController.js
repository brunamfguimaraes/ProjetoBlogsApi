const express = require('express');
const { BlogPost, PostsCategory } = require('../models');
const validateJWT = require('../middlewares/token/validateJWT');
const postValidate = require('../middlewares/postValidate');

const BlogPostRouter = express.Router();

BlogPostRouter.post('/', validateJWT, postValidate, async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { user } = req;

  const post = await BlogPost.create({ userId: user.id, title, content });
  
  const { id } = post;

  await categoryIds.forEach(async (categoryId) => {
    const postId = id;
    await PostsCategory.create({ categoryId, postId });
  });

  const { published, updated, ...postWithoutTimes } = post.dataValues;

  return res.status(201).json(postWithoutTimes);
});

module.exports = BlogPostRouter;