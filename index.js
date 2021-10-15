const express = require('express');
const bodyParser = require('body-parser');
const { user, login, getUsers, findUser } = require('./controllers/userController');
const { category, allCategories } = require('./controllers/categoryController');
const { createPost, getAllPosts, findPost } = require('./controllers/postController');
const validateJWT = require('./auth/validateJWT');

const app = express();
app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', login);

app.get('/user/:id', validateJWT, findUser);

app.get('/post/:id', validateJWT, findPost);

app.route('/user')
  .post(user)
  .get(validateJWT, getUsers);

app.route('/categories')
  .post(validateJWT, category)
  .get(validateJWT, allCategories);

app.route('/post')
  .post(validateJWT, createPost)
  .get(validateJWT, getAllPosts);