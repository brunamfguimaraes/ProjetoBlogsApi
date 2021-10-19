require('dotenv').config();
const { Op } = require('sequelize');
const express = require('express');
const jwt = require('jsonwebtoken');
const { User, Categorie, BlogPost } = require('./models');
const messages = require('./helpers/validationMessages');

const app = express();

app.use(express.json());

const { JWT_SECRET } = process.env;

const jwtConfig = {
  expiresIn: '2d',
  algorithm: 'HS256',
};

const validationJWT = require('./middlewares/validationJWT');

const { 
  validateDisplayName,
  validateEmail,
  emptyFields,
  validatePassword,
  userExists,
  emailExists,
  validateFields,
  existCategories } = require('./middlewares/validationFields');

  // não remova esse endpoint, e para o avaliador funcionar
  app.get('/', (request, response) => {
    response.send();
  });
  app.get('/user/:id', validationJWT, async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) return res.status(404).json(messages.USER_DOES_NOT_EXIST);
      return res.status(200).json(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).json(messages.ERROR);
    }
  });
  app.get('/user', validationJWT, async (_req, res) => {
    try {
      const users = await User.findAll();
      return res.status(200).json(users);
    } catch (error) {
      console.log(error.message);
      res.status(500).json(messages.ERROR);
    }
  });
  app.get('/categories', validationJWT, async (_req, res) => {
    try {
      const users = await Categorie.findAll();
      return res.status(200).json(users);
    } catch (error) {
      console.log(error.message);
      res.status(500).json(messages.ERROR);
    }
  });
  app.get('/post/search', validationJWT, async (req, res) => {
      const { q } = req.query;
      if (q) {
        const posts = await BlogPost.findAll({
          where: { [Op.or]: [{ title: q }, { content: q }] },
          attributes: { exclude: ['user_id'] },
          include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
          { model: Categorie, as: 'categories', through: { attributes: [] } }],
        });
        res.status(200).json(posts);
      } else if (!q) {
        const secondPosts = await BlogPost.findAll({
          attributes: { exclude: ['user_id'] },
          include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
          { model: Categorie, as: 'categories', through: { attributes: [] } }],
        });
        return res.status(200).json(secondPosts);
      }
      if (q === null) return [];
  });
  app.get('/post/:id', validationJWT, async (req, res) => {
    try {
      const { id } = req.params;
      const getId = await BlogPost.findByPk(id);
      const posts = await BlogPost.findOne({
        where: { id },
        attributes: { exclude: ['user_id'] },
        include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Categorie, as: 'categories', through: { attributes: [] } }],
      });
      if (!getId) res.status(404).json(messages.POST_DOES_NOT_EXIST);
      return res.status(200).json(posts);
    } catch (error) {
      console.log(error.message);
      res.status(500).json(messages.ERROR);
    }
  });
  app.get('/post', validationJWT, async (_req, res) => {
    try {
      const posts = await BlogPost.findAll({
        attributes: { exclude: ['user_id'] },
        include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Categorie, as: 'categories', through: { attributes: [] } }],
      });
      return res.status(200).json(posts);
    } catch (error) {
      console.log(error.message);
      res.status(500).json(messages.ERROR);
    }
  });
  app.post('/user', validateDisplayName, validateEmail, validateFields, validatePassword,
    emailExists, async (req, res) => {
    try {
      const { displayName, email, password, image } = req.body;
      await User.create({ displayName, email, password, image });
      const userSearch = await User.findOne({ where: { email } });
      const { id } = userSearch;
      const userWithoutPassword = { id, displayName, email, image };
      const token = jwt.sign({ payload: userWithoutPassword }, JWT_SECRET, jwtConfig);
      return res.status(201).json({ token });
    } catch (error) {
      console.log(error);
      res.status(500).json(messages.ERROR);
    }
  });
  app.post('/login', validateFields, emptyFields, userExists, async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const getUser = await User.findOne({ where: { email, password } });
  
      const { id, displayName, image } = getUser;
  
      const userWithoutPassword = {
        id,
        displayName,
        email,
        image,
      };
  
      const token = jwt.sign({ payload: userWithoutPassword }, JWT_SECRET, jwtConfig);
  
      return res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      res.status(500).json(messages.ERROR);
    }
  });
  app.post('/categories', validationJWT, async (req, res) => {
    try {
      const { name } = req.body; 
      if (!name) return res.status(400).json(messages.REQUIRED_NAME);
      const createCategorie = await Categorie.create({ name });
      return res.status(201).json(createCategorie);
    } catch (error) {
      console.log(error);
      res.status(500).json(messages.ERROR);
    }
  });
  app.post('/post', validationJWT, async (req, res) => {
      const { title, content, categoryIds } = req.body; 
      const getUser = req.user;
      const userId = getUser.id;
      const compareCategories = await existCategories(categoryIds);
      if (!title) return res.status(400).json(messages.REQUIRED_TITLE);
      if (!content) return res.status(400).json(messages.REQUIRED_CONTENT); 
      if (!categoryIds) return res.status(400).json(messages.REQUIRED_CATEGORY_ID);
      if (compareCategories === null) return res.status(400).json(messages.CATEGORY_IDS_NOT_FOUND);
      const createPost = await BlogPost.create({ userId, title, content });
      const { id } = createPost;
      return res.status(201).json({ id, userId, title, content });
  });
  app.put('/post/:id', validationJWT, async (req, res) => {
      const { title, content, categoryIds } = req.body;
      const { id } = req.params;
      const token = req.headers.authorization;
      const { payload } = jwt.verify(token, JWT_SECRET);
      const updateBlog = await BlogPost.update({ title, content }, { where: { id } });
      console.log(updateBlog);
      if (!title) res.status(400).json(messages.REQUIRED_TITLE);
      if (!content) res.status(400).json(messages.REQUIRED_CONTENT);
      if (categoryIds) res.status(400).json(messages.EDIT_CATEGORIES);
      const posts = await BlogPost.findOne({
        where: { id },
        attributes: { exclude: ['user_id', 'id', 'published', 'updated'] },
        include: [{ model: Categorie, as: 'categories', through: { attributes: [] } }],
      });
      const { userId } = posts;
      if (userId !== payload.id) res.status(401).json(messages.UNAUTHORIZED_USER);
      return res.status(200).json(posts);
  });
  app.delete('/post/:id', validationJWT, async (req, res) => {
    try {
      const { id } = req.params;
      const token = req.headers.authorization;
      const { payload } = jwt.verify(token, JWT_SECRET);
      const getId = await BlogPost.findByPk(id);
      if (!getId) res.status(404).json(messages.POST_DOES_NOT_EXIST);
      const posts = await BlogPost.findOne({ where: { id } });
      const { userId } = posts;
      if (userId !== payload.id) {
        res.status(401).json(messages.UNAUTHORIZED_USER);
      } else {
        await BlogPost.destroy({ where: { id } });
      }
      return res.status(204).json();
    } catch (e) {
      console.log(e.message);
      res.status(204).json();
    }
  });
  app.delete('/user/me', validationJWT, async (req, res) => {
    try {
      const token = req.headers.authorization;
      const { payload } = jwt.verify(token, JWT_SECRET);
      const { id } = payload;
      const getUser = await User.destroy({ where: { id } });
      console.log(getUser);
      return res.status(204).json();
    } catch (e) {
      console.log(e.message);
      res.status(204).json();
    }
  });
app.listen(3000, () => console.log('ouvindo porta 3000!'));

module.exports = app;