const express = require('express');
const bodyParser = require('body-parser');
const { createUser, findAllUsers, findUserById } = require('./controllers/userController');
const { createCategory, findAllCategories } = require('./controllers/categoryController');
const { categoryNameValidation } = require('./services/categoryValidation');
const { jwtValidation } = require('./services/jwtValidation');
const { findUserLogin } = require('./controllers/loginController');
const { userNameValidation,
  emailValidation,
  passwordValidation,
  } = require('./services/userValidation');

const { loginEmailValidation,
  loginPasswordValidation,
  loginValidation } = require('./services/loginValidation');

const { createPost } = require('./controllers/blogPostController');
const { titleValidation,
  contentValidation, categoryKeyValidation } = require('./services/postCategoriesValidation');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/user', userNameValidation, emailValidation,
passwordValidation, createUser); // req 1

app.post('/login', loginEmailValidation, loginPasswordValidation, loginValidation, findUserLogin); // req 2

app.get('/user', jwtValidation, findAllUsers); // req 3

app.get('/user/:id', jwtValidation, findUserById); // req 4

app.post('/categories', jwtValidation, categoryNameValidation, createCategory); // req 5

app.get('/categories', jwtValidation, findAllCategories); // req 6

app.post('/post',
  jwtValidation,
  titleValidation, contentValidation, categoryKeyValidation, createPost); // req 7

app.get('/post', jwtValidation); // req 8

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (req, res) => {
  res.send();
});

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
