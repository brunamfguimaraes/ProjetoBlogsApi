require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const UserController = require('./controllers/UserController');
const CategoryController = require('./controllers/CategoryController');
const PostController = require('./controllers/PostController');
const userErrorMiddleware = require('./middlewares/UserError');
const categoryErrorMiddleware = require('./middlewares/CategoryError');
const postErrorMiddleware = require('./middlewares/PostError');
const JWTMiddleware = require('./middlewares/jwtAuth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/user', JWTMiddleware, UserController.listUsers);
app.get('/user/:id', JWTMiddleware, UserController.findUser);
app.post('/user', UserController.newUser);
app.post('/login', UserController.login);

app.use(userErrorMiddleware);

app.post('/categories', JWTMiddleware, CategoryController.newCategory);
app.get('/categories', JWTMiddleware, CategoryController.listCategories);

app.use(categoryErrorMiddleware);

app.get('/post', JWTMiddleware, PostController.listPosts);
app.get('/post/:id', JWTMiddleware, PostController.findPost);
app.post('/post', JWTMiddleware, PostController.newPost);
app.use(postErrorMiddleware);