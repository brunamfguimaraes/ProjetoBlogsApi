const express = require('express');
const { BlogPost, User, PostCategory, Category } = require('../models');
require('dotenv/config');
const validatePost = require('../middlewares/validatePost');
const validateToken = require('../middlewares/validateToken');
const validateEdit = require('../middlewares/validateEdit');

const router = express.Router();

const savePostCategories = (postId, categories) => {
  categories.forEach(async (element) => {
    console.log(postId);
    console.log(element);
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
  return res.status(200).json(posts);
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
  if (!post) return res.status(404).json({ message: 'Post does not exist' });
  return res.status(200).json(post);
});

router.post('/', validateToken, validatePost, async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { email } = req;
  try {
    const user = await User.findOne({ where: { email } });
    const newPost = await BlogPost.create(
      { title, content, categoryIds: JSON.stringify(categoryIds), userId: user.dataValues.id },
    );
    await savePostCategories(newPost.id, categoryIds);
    return res.status(201).json(newPost);
  } catch (e) {
    console.log(e);
  }
});

router.put('/:id', validateToken, validateEdit, async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    await BlogPost.update({ title, content }, { where: { id } });
    const updated = await BlogPost.findOne({
      where: { id },
      include: [
        { model: User, as: 'user' },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    console.log(updated);
    return res.status(200).json(updated);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;