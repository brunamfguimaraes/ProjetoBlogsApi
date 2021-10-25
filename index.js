const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const categoryController = require('./controllers/categoryController');
const blogPostController = require('./controllers/blogPostController');
const validateJWT = require('./auth/validateJWT');

const app = express();

app.use(bodyParser.json());

app.post('/user', userController.createUser);
app.post('/login', loginController.login);
app.get('/user', validateJWT, userController.getAllUsers);
app.get('/user/:id', validateJWT, userController.getById);
app.post('/categories', validateJWT, categoryController.createCategory);
app.get('/categories', validateJWT, categoryController.getAllCategories);
app.post('/post', validateJWT, blogPostController.createPost);
app.get('/post', validateJWT, blogPostController.getAll);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});