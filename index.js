require('dotenv');

const express = require('express');
const bodyParser = require('body-parser');

const {
  verifyEmail, verifyName, verifyPassword, userAlreadyExists,
  verifyImage, createUser } = require('./services/user');

const { User } = require('./models');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', verifyEmail, userAlreadyExists, verifyPassword, verifyName,
verifyImage, createUser);

app.get('/user', (req, res) => {
  User.findAll().then((dados) => res.status(200).json(dados))
    .catch((e) => {
      console.log(e.message);
      res.status(500).json({ message: 'erro' });
    });
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));
