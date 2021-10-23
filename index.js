const express = require('express');

const { user, login, getUsers, findUser } = require('./controller/user');
const { category, allCategories } = require('./controller/category');
const validateToken = require('./auth/validateJWT');
const { createPost, getAllPosts } = require('./controller/post');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.route('/login').post(login);

app.route('/user').post(user);
app.route('/user').get(validateToken, getUsers);
app.route('/user/:id').get(validateToken, findUser);

app.route('/categories').post(validateToken, category);
app.route('/categories').get(validateToken, allCategories);

app.route('/post').post(validateToken, createPost);
app.route('/post').get(validateToken, getAllPosts);
