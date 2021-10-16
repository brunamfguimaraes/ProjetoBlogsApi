require('dotenv');

const express = require('express');
const bodyParser = require('body-parser');

const { verifyEmail, verifyName, verifyPassword, userAlreadyExists,
  createUser, loginUp, emptyEmailLogin, emptyPasswordLogin,
  getUsers, validToken,
  getUserById,
 } = require('./services/user');

const { createCategory, verifyCategory, getAllCategories } = require('./services/category');

const { createPost, getAllPosts } = require('./services/post');
const { checkTitle, checkContent, checkCategoriesIds,
   checkIfCategoryExists } = require('./middlewares/post');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', verifyEmail, userAlreadyExists, verifyPassword, verifyName, createUser);
app.post('/login', emptyEmailLogin, emptyPasswordLogin, loginUp);
app.post('/categories', validToken, verifyCategory, createCategory);
app.post('/post', validToken, checkTitle, checkContent, checkCategoriesIds,
checkIfCategoryExists, createPost);

app.get('/user/:id', validToken, getUserById);
app.get('/user', validToken, getUsers);
app.get('/categories', validToken, getAllCategories);
app.get('/post', validToken, getAllPosts);

app.listen(process.env.PORT || 3000, () => console.log('ouvindo porta 3000!'));
