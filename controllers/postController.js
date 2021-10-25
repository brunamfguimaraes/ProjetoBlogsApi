const express = require('express');
const Sequelize = require('sequelize');
const {
  validateTitleWasInformed,
  validateContentWasInformed, 
  validateCategoryWasInformed, 
  validateCategoryIdAlreadyRegistered } = require('../middlewares/blogPostMiddlewares');
const {
  validatePostOwner,
  validateNotEditCategory,
  validatePostTitleWasInformed,
  validatePostContentWasInformed } = require('../middlewares/postMiddleware');
const { validateJWT } = require('../middlewares/userMiddlewares');
const { User, Category, BlogPost, PostCategory } = require('../models');

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
// Requisito 8: CONTROLLER responsável por realizar busca de BlogPosts via sequelize e retornar BlogPosts cadastrados.

postRouter.get('/', validateJWT, async (req, res) => {
  try {
    const posts = await BlogPost.findAll(
      { include: [
        { model: User, as: 'user' },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ] },
    );

    return res.status(200).json(posts);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
});

// ---------------------------------------------------------------
// Requisito 9: CONTROLLER responsável por realizar busca de BlogPosts por ID via sequelize e retornar o BlogPosts cadastrado.

postRouter.get('/:id', validateJWT, async (req, res) => {
  try {
    const { id } = req.params;

    const post = await BlogPost.findOne(
      {
        where: { id },
        include: [
          { model: User, as: 'user' },
          { model: Category, as: 'categories', through: { attributes: [] } },
        ],
      },
    );

    if (!post) return res.status(404).json({ message: 'Post does not exist' });

    return res.status(200).json(post);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

// ---------------------------------------------------------------
// Requisito 10: CONTROLLER responsável por realizar a atualização de um BlogPosts via sequelize e retornar o BlogPosts atualizado.

postRouter.put('/:id',
  validateJWT,
  validatePostOwner,
  validateNotEditCategory,
  validatePostTitleWasInformed,
  validatePostContentWasInformed, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const post = await BlogPost.findOne({
      where: { id },
      include: [{ model: Category, as: 'categories', through: { attributes: [] } }],
    });

    // Source: https://sequelize.org/master/manual/model-instances.html
    post.title = title;
    post.content = content;
    // Campos ainda estão originais da base de dados

    await post.save();
    // Agora os campos foram atualizados na base de dados!
    
    return res.status(200).json(post);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

// ---------------------------------------------------------------

module.exports = { postRouter };
