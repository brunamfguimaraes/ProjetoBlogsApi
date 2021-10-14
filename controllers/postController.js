const express = require('express');
const { Op } = require('sequelize');
const { BlogPost, Category, User } = require('../models');
const { validatePost, validatePostUpdate } = require('../helpers/validate');

const SERVER_ERROR_MESSAGE = 'Internal Server Error';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const posts = await BlogPost.findAll({
      include: [{ model: User,
        as: 'user',
        attributes: { exclude: ['password'] } },
        // through: { attributes: [] } },
      { model: Category, as: 'categories', through: { attributes: [] } }],
    });

    return res.status(200).json(posts);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: SERVER_ERROR_MESSAGE });
  }
});

router.get('/search', async (req, res) => {
  const { q } = req.query;
  try {
    const posts = await BlogPost.findAll({
      where: {
        [Op.or]: [{ title: { [Op.like]: `%${q}%` } }, { content: { [Op.like]: `%${q}%` } }],
      },
      include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } }],
    });
    return res.status(200).json(posts);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: SERVER_ERROR_MESSAGE });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await BlogPost.findByPk(id, {
      include: [{ model: User,
        as: 'user',
        attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } }],
    });

    if (!post) return res.status(404).json({ message: 'Post does not exist' });

    return res.status(200).json(post);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: SERVER_ERROR_MESSAGE });
  }
});

router.post('/', async (req, res) => {
  const { id } = req.user;
  const { categoryIds, ...data } = req.body;
  data.userId = id;
  const message = validatePost(req.body);
  if (message) return res.status(400).json({ message });

  try {
    const newPost = await BlogPost.create(data);
    const categories = await Category.findAll({ where: { id: categoryIds } });
    if (categories.length === 0) {
      return res.status(400).json({ message: '"categoryIds" not found' });
    }
    await newPost.addCategories(categories);
    return res.status(201).json({ id: newPost.id, ...data });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: SERVER_ERROR_MESSAGE });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const post = await BlogPost.findByPk(id);

  if (req.user.id !== post.userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  const message = validatePostUpdate(req.body);
  if (message) return res.status(400).json({ message });
  try {
    await BlogPost.update(req.body, { where: { id } });
    const updatedPost = await BlogPost.findByPk(id, {
      attributes: { include: ['title', 'content', 'userId'] },
      include: [{ model: Category, as: 'categories', through: { attributes: [] } }] });
    if (!updatedPost) return res.status(404).json({ message: 'Post does not exist' });

    return res.status(200).json(updatedPost);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: SERVER_ERROR_MESSAGE });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await BlogPost.findByPk(id);
    if (post) {
      if (req.user.id === post.userId) {
        await post.destroy();
        return res.status(204).json({ message: 'Post deleted successfully' });          
      } 
        return res.status(401).json({ message: 'Unauthorized user' });
    }
    return res.status(404).json({ message: 'Post does not exist' });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: SERVER_ERROR_MESSAGE });
  }
});

module.exports = router;
