const express = require('express');
const { BlogPost, User } = require('../models');
require('dotenv/config');
const validatePost = require('../middlewares/validatePost');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.get('/', validateToken, async (_req, res) => {
  const posts = await BlogPost.findAll();
  return res.status(200).json(posts);
});

router.post('/', validateToken, validatePost, async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { email } = req;
  try {
    const user = await User.findOne({ where: { email } });
    const newPost = await BlogPost.create(
      { title, content, categoryIds: JSON.stringify(categoryIds), userId: user.id },
    );
    return res.status(201).json(newPost);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;