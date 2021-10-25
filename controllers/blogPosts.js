const express = require('express');
const { BlogPost, User, Category } = require('../models');
const { 
    valdateJwt, 
    validateTitle,
    validateContent,
    validateCategoryKey,
} = require('../midlewares');

const router = express.Router();
const ALGO_DEU_ERRADO = 'Algo deu errado';

router.get('/', valdateJwt, async (_req, res) => {
  try {
    const posts = await BlogPost.findAll({
      include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
    });
    return res.status(200).json(posts);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: ALGO_DEU_ERRADO });
  }
});

router.post('/',
valdateJwt, 
validateTitle, 
validateContent,
validateCategoryKey,
async (req, res) => {
  const { user } = req;
  try {
    const dataValues = await BlogPost.create({ userId: user.id, ...req.body });
    return res.status(201).json(dataValues);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: ALGO_DEU_ERRADO });
  }
});

module.exports = router;
