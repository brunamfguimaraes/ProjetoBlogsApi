const express = require('express');

const Post = require('../services/Post');
const tokenValidator = require('../middlewares/tokenValidator');
const postValidator = require('../middlewares/postValidator');
const { CREATED, SUCCESS, NOT_FOUND } = require('../utils/statusCode');

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

router.get('/:id',
  tokenValidator.validateToken,
  async (req, res) => {
    const post = await Post.findByPk(req.params);

    if (!post) return res.status(NOT_FOUND).json({ message: 'Post does not exist' });

    return res.status(SUCCESS).json(post);
});

module.exports = router;