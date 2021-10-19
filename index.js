require('dotenv').config();
const express = require('express');
const usersController = require('./controllers/usersController');
const categoriesController = require('./controllers/categoriesController');
const postsController = require('./controllers/postsController');

const validateUser = require('./middlewares/validateUserInfo');
const validateLogin = require('./middlewares/validateLoginInfo');
const validateJWT = require('./middlewares/validateJWT');
const validateCategory = require('./middlewares/validateCategoryInfo');
const validatePost = require('./middlewares/validatePostInfo');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));

// não remova esse endpoint, e para o avaliador funcionar.
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', validateUser, usersController.createUser);

app.post('/login', validateLogin, usersController.loginUser);

app.post('/categories', validateJWT, validateCategory, categoriesController.createCategory);

app.post('/post', validateJWT, validatePost, postsController.createPost);

app.get('/user', validateJWT, usersController.getAll);

app.get('/user/:id', validateJWT, usersController.getById);

app.get('/categories', validateJWT, categoriesController.getAll);