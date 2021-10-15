const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const { validateCreateUser, validateLogin } = require('./middlewares/userValidations');
const { postValidations, updatePostValidations } = require('./middlewares/postValidations');
const userControllers = require('./controllers/userControllers');
const categoryControllers = require('./controllers/categoryControllers');
const blogPostControllers = require('./controllers/blogPostControllers');
const error = require('./middlewares/error');
const { authenticateToken } = require('./middlewares/Token');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', validateCreateUser, userControllers.createUser);

app.post('/login', validateLogin, userControllers.login);

app.get('/user', authenticateToken, userControllers.getUsers);

app.get('/user/:id', authenticateToken, userControllers.getUserById);

app.post('/categories', authenticateToken, categoryControllers.createCategory);

app.get('/categories', authenticateToken, categoryControllers.getCategories);

app.post('/post', authenticateToken, postValidations, blogPostControllers.createPost);

app.get('/post', authenticateToken, blogPostControllers.getPosts);

app.get('/post/:id', authenticateToken, blogPostControllers.getPostById);

app.put('/post/:id', authenticateToken, updatePostValidations, blogPostControllers.updatePost);

app.use(error);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));