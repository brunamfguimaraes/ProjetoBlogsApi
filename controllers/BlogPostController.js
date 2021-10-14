const express = require('express');
const { BlogPost } = require('../models');
const validateJWT = require('../middlewares/token/validateJWT');

const BlogPostRouter = express.Router();

BlogPostRouter.post('/', validateJWT, async (req, res) => {
  const { title, content } = req.body;
  const { user } = req;

  const post = await BlogPost.create({ userId: user.id, title, content });
  const { published, updated, ...postWithoutTimes } = post.dataValues;

  return res.status(201).json(postWithoutTimes);
});

module.exports = BlogPostRouter;