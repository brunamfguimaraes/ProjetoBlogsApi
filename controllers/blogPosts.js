const express = require('express');

const { BlogPost, User } = require('../models');

const validatePost = require('../middlewares/validatePost');
const validateToken = require('../middlewares/validateToken');

require('dotenv/config');

const HTTP = {
  Ok: 200,
  Created: 201,
};

const router = express.Router();

router.get('/', validateToken, async (_req, res) => {
  const posts = await BlogPost.findAll({
    include: { model: User, as: 'user' },
  });

  return res.status(HTTP.Ok).json(posts);
});

router.post('/', validateToken, validatePost, async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { email } = req;

  try {
    const user = await User.findOne({ where: { email } });
    
    const newPost = await BlogPost.create(
      { title, content, categoryIds: JSON.stringify(categoryIds), userId: user.dataValues.id },
    );
    
    return res.status(HTTP.Created).json(newPost);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router; 