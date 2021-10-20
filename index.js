const express = require('express');
const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');
const postController = require('./controllers/postController');
const { Token } = require('./middlewares/validateJWT');
const {
  validName,
  validEmail,
  validPassword,
  alreadyExists,
  validCategoryName,
  validTitle,
  validCategoryId,
  validContent,
} = require('./middlewares/validations');

const app = express();

app.use(express.json());

app.get('/user', Token, userController.getAllUsers);
app.get('/user/:id', Token, userController.getUserById);
app.get('/categories', Token, categoryController.getAllCategories);

app.post('/user', validName, validEmail, validPassword, alreadyExists, userController.createUser);
app.post('/login', validEmail, validPassword, userController.loginUser);
app.post('/categories', Token, validCategoryName, categoryController.createCategory);
app.post('/post', Token, validTitle, validContent, validCategoryId, postController.createPost);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
