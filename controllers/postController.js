const express = require('express');
const { validateJWT } = require('../middlewares/userMiddlewares');
const { BlogPost } = require('../models');

const postRouter = express.Router();

// ---------------------------------------------------------------
// Requisito 7: CONTROLLER responsável por realizar cadastro de posts via sequelize e retornar o post cadastrada.

postRouter.post('/', validateJWT, async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id } = req.user;
    const newPost = await BlogPost.create({ title, content, categoryIds, userId: id });
    // , published: null, updated: null
    console.log(newPost.dataValues);

    return res.status(201).json(newPost.dataValues);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

// ---------------------------------------------------------------

module.exports = { postRouter };