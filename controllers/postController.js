const express = require('express');
const Sequelize = require('sequelize');
const {
  validateTitleWasInformed,
  validateContentWasInformed, 
  validateCategoryWasInformed, 
  validateCategoryIdAlreadyRegistered } = require('../middlewares/blogPostMiddlewares');
const { validateJWT } = require('../middlewares/userMiddlewares');
const { BlogPost, PostCategory } = require('../models');

const config = require('../config/config');

// Source: https://app.betrybe.com/course/back-end/arquitetura-solid-e-orm/orm-associations/043e2e8a-c28e-4b95-a949-b7c43221ca8d/conteudos/e7db80cd-913f-454d-bac0-93e6be7ad660/transacoes/e5d72f31-0aa5-4d5a-b4c2-f1d25f851729?use_case=side_bar
const sequelize = new Sequelize(config.development);

const postRouter = express.Router();

// ---------------------------------------------------------------
// Requisito 7: CONTROLLER responsável por realizar cadastro de posts via sequelize e retornar o post cadastrada.

postRouter.post('/',
  validateJWT,
  validateTitleWasInformed,
  validateContentWasInformed,
  validateCategoryWasInformed,
  validateCategoryIdAlreadyRegistered, async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { title, content, categoryIds } = req.body;
    const { id } = req.user;

    const newPost = await BlogPost.create({ title, content, userId: id }, { transaction: t });

    const postCategories = categoryIds.map((categoryId) => PostCategory.create(
      { postId: newPost.id, categoryId },
      { transaction: t },
    ));

    await Promise.all(postCategories); // Comments: Resolve "as" promises armazenadas em postcategories.

    await t.commit(); // Comments: Commita a transaction no banco de dados caso não haja erros.
    
    return res.status(201).json({ id: newPost.id, userId: id, title, content });
  } catch (e) {
    await t.rollback(); // Comments: Executa o rollback da transaction caso haja erros.
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

// ---------------------------------------------------------------

module.exports = { postRouter };