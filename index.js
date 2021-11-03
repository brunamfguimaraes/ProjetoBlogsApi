const express = require('express');
const bodyParser = require('body-parser');

const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const categoriesController = require('./controllers/categoriesController');
const postController = require('./controllers/postController');
const tokenMiddleware = require('./middlewares/tokenMiddleware');

const app = express();

app.use(bodyParser.json());

app.use('/user', userController);
app.use('/login', loginController);
app.use('/categories', tokenMiddleware, categoriesController);
app.use('/post', tokenMiddleware, postController);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`ouvindo porta ${port}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
