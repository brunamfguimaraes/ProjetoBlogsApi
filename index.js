const express = require('express');
const bodyParser = require('body-parser');

const { validateCreateUser, validateLogin } = require('./middlewares/userValidations');
const { postValidations } = require('./middlewares/postValidations');
const userControllers = require('./controllers/userControllers');
const categoryControllers = require('./controllers/categoryControllers');
const blogPostControllers = require('./controllers/blogPostControllers');
const error = require('./middlewares/error');
const { authenticateToken } = require('./middlewares/Token');

const app = express();

app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

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

app.use(error);