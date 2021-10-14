require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const { User, Categorie } = require('./models');
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
  validateFields } = require('./middlewares/validationFields');

  app.get('/user/:id', validationJWT, async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) return res.status(404).json(messages.USER_DOES_NOT_EXIST);

      return res.status(200).json(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: 'Algo deu errado' });
    }
  });

  app.get('/user', validationJWT, async (_req, res) => {
    try {
      const users = await User.findAll();
  
      return res.status(200).json(users);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: 'Algo deu errado' });
    }
  });

  app.post('/user',
    validateDisplayName,
    validateEmail,
    validateFields,
    validatePassword,
    emailExists, async (req, res) => {
    try {
      const { displayName, email, password, image } = req.body;
  
      await User.create({ displayName, email, password, image });
  
      const userSearch = await User.findOne({ where: { email } });
  
      const { id } = userSearch;
  
      const userWithoutPassword = {
        id,
        displayName,
        email,
        image,
      };
  
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

  // não remova esse endpoint, e para o avaliador funcionar
  app.get('/', (request, response) => {
    response.send();
  });

app.listen(3000, () => console.log('ouvindo porta 3000!'));

module.exports = app;
