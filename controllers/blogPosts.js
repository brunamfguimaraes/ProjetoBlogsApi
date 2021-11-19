const express = require('express');

const { BlogPost, User, PostCategory, Category } = require('../models');

const validatePost = require('../middlewares/validatePost');
const validateToken = require('../middlewares/validateToken');

require('dotenv/config');

const HTTP = {
  Ok: 200,
  Created: 201,
  NotFound: 404,
};

const router = express.Router();

const savePostCategories = (postId, categories) => {
  categories.forEach(async (element) => {
    await PostCategory.create({ postId, categoryId: element });
  });
};

router.get('/', validateToken, async (_req, res) => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return res.status(HTTP.Ok).json(posts);
});

router.get('/:id', validateToken, async (req, res) => {
  const { id } = req.params;

  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!post) return res.status(HTTP.NotFound).json({ message: 'Post does not exist' });

  return res.status(HTTP.Ok).json(post);
});

router.post('/', validateToken, validatePost, async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { email } = req;

  try {
    const user = await User.findOne({ where: { email } });
    
    const newPost = await BlogPost.create(
      { title, content, categoryIds: JSON.stringify(categoryIds), userId: user.dataValues.id },
    );

    savePostCategories(newPost.id, categoryIds);

    return res.status(HTTP.Created).json(newPost);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router; 