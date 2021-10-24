const express = require('express');
const bodyParser = require('body-parser');

const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const categoriesController = require('./controllers/categoriesController');
const postController = require('./controllers/postController');
const { required, isEmpty } = require('./middlewares/loginMiddleware');
const validToken = require('./middlewares/tokenMiddleware');

const app = express();

app.use(bodyParser.json());

app.use('/user', userController);
app.use('/login', required, isEmpty, loginController);
app.use('/categories', validToken, categoriesController);
app.use('/post', postController);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`ouvindo porta ${port}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
