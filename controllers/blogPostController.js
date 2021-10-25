const express = require('express');
const blogPostService = require('../services/blogPostService');
const { authValidation, authValid } = require('../auth/authMiddleware');
const { User, BlogPost, Category } = require('../models');

const router = express.Router();

router.post('/', authValidation, async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const token = req.headers.authorization;
  const payload = await authValid(token);

  const findUser = await User.findOne({ where: { email: payload } });
  const userId = findUser.dataValues.id;

  try {
    const category = await blogPostService.create(title, content, userId, categoryIds);

    if (category.erro) {
      return res.status(category.erro.code).json({ message: category.erro.message });
    }

    return res.status(201).json(category.dataValues);
  } catch (error) {
    // console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

router.get('/', authValidation, async (_req, res) => {
  try {
    const categories = await BlogPost.findAll({ include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
      ] });
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;