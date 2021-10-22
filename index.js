const express = require('express');
const bodyParser = require('body-parser');
const { postUser, userLogin, getAllUsers, userById } = require('./controllers/user');
const { postCategory } = require('./controllers/category');
const { verifyEmail,
  verifyDisplayName,
  verifyPassword,
  verifyToken } = require('./middlewares/user');

const app = express();

app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user',
verifyEmail,
verifyDisplayName,
verifyPassword, async (req, res) => postUser(req, res));

app.post('/login',
verifyEmail,
verifyPassword,
async (req, res) => userLogin(req, res));

app.get('/user', verifyToken, async (req, res) => getAllUsers(req, res));

app.get('/user/:id', verifyToken, async (req, res) => userById(req, res));

app.post('/categories', verifyToken, async (req, res) => postCategory(req, res));