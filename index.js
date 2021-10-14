require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('./models');
const messages = require('./helpers/validationMessages');

const app = express();

app.use(express.json());

const { JWT_SECRET } = process.env;

const jwtConfig = {
  expiresIn: '2d',
  algorithm: 'HS256',
};

const { 
  validateDisplayName,
  validateEmail,
  emptyFields,
  validatePassword,
  userExists,
  emailExists,
  validateFields } = require('./middlewares/validationFields');

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
    } catch (e) {
      console.log(e);
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
    } catch (e) {
      console.log(e);
      res.status(500).json(messages.ERROR);
    }
  });

  // não remova esse endpoint, e para o avaliador funcionar
  app.get('/', (request, response) => {
    response.send();
  });

app.listen(3000, () => console.log('ouvindo porta 3000!'));

module.exports = app;
