const express = require('express');

const Post = require('../services/Post');
const tokenValidator = require('../middlewares/tokenValidator');
const postValidator = require('../middlewares/postValidator');
const { CREATED, SUCCESS } = require('../utils/statusCode');

const router = express.Router();

router.post('/',
postValidator.validatePost,
postValidator.validateCategoryExists,
tokenValidator.validateToken,
  async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const { id } = req.user;
    const post = await Post.create({
      title,
      content,
      categoryIds,
      userId: id,
    });
  
    return res.status(CREATED).json(post);
  });

router.get('/',
  tokenValidator.validateToken,
  async (_req, res) => {
    const posts = await Post.findAll();

    return res.status(SUCCESS).json(posts);
  });

module.exports = router;