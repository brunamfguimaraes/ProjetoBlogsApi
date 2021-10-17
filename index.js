require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { verifyEmptyEmail, verifyEmptyPassword, userLogin, checkEmailExists,
  checkPassword,
  checkName, checkEmail, createUser, validateToken, getAllUsers,
  getUser } = require('./services/user.js');
const { verifyCategory, createCategory, getAllCategories } = require('./services/categories');
const { verifyTitle, verifyContent, verifyCategoryId,
  verifyCategoryIdExists, createPostBlog } = require('./services/post');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', checkEmail, checkEmailExists, checkPassword, checkName, createUser);
app.post('/login', verifyEmptyEmail, verifyEmptyPassword, userLogin);
app.post('/categories', validateToken, verifyCategory, createCategory);
app.post('/post', validateToken, verifyTitle, verifyContent, verifyCategoryId,
  verifyCategoryIdExists, createPostBlog);

app.get('/user', validateToken, getAllUsers);
app.get('/user/:id', validateToken, getUser);
app.get('/categories', validateToken, getAllCategories);

app.listen(3000, () => console.log('ouvindo porta 3000!'));