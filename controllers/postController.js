const express = require('express');
const Sequelize = require('sequelize');
require('dotenv/config');
const validPost = require('../middlewares/postMiddleware');
const validToken = require('../middlewares/tokenMiddleware');
const { PostsCategorie, User, BlogPost, Categorie } = require('../models');
const editPoster = require('../middlewares/editmiddleware');
const authorPost = require('../middlewares/authorMidleware');

const { Op } = Sequelize;
const router = express.Router();

const createPostCategories = (postId, categories) => {
  categories.forEach(async (element) => {
    console.log(postId);
    console.log(element);
    await PostsCategorie.create({ postId, categoryId: element });
  });
};

router.get('/', validToken, async (_req, res) => {
  const allPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Categorie, as: 'categories', through: { attributes: [] } },
    ],
  });
  return res.status(200).json(allPosts);
});

router.get('/search', validToken, async (req, res) => {
  const { q } = req.query;
  try {
    const results = await BlogPost.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${q}%` } },
          { content: { [Op.like]: `%${q}` } },
        ],
      },
      include: [{ model: User, as: 'user' },
        { model: Categorie, as: 'categories', through: { attributes: [] } },
      ] });
    return res.status(200).json(results);
  } catch (e) {
    console.log(e);
  }
});

router.get('/:id', validToken, async (req, res) => {
  const { id } = req.params;
  const getPost = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user' },
      { model: Categorie, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!getPost) return res.status(404).json({ message: 'Post does not exist' });
  return res.status(200).json(getPost);
});

router.post('/', validToken, validPost, async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { email } = req;
  try {
    const getUser = await User.findOne({ where: { email } });
    const createPost = await BlogPost.create(
      { title, content, categoryIds: JSON.stringify(categoryIds), userId: getUser.dataValues.id },
    );
    await createPostCategories(createPost.id, categoryIds);
    return res.status(201).json(createPost);
  } catch (e) {
    console.log(e);
  }
});

router.put('/:id', validToken, editPoster, async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    await BlogPost.update({ title, content }, { where: { id } });
    const updatedPost = await BlogPost.findOne({
      where: { id },
      include: [
        { model: User, as: 'user' },
        { model: Categorie, as: 'categories', through: { attributes: [] } },
      ],
    });
    console.log(updatedPost);
    return res.status(200).json(updatedPost);
  } catch (e) {
    console.log(e);
  }
});

router.delete('/:id', validToken, authorPost, async (req, res) => {
  const { id } = req.params;
  try {
    await BlogPost.destroy({ where: { id } });
    return res.send(204);
  } catch (e) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
});

module.exports = router;
