const express = require('express');
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const categoriesController = require('./controllers/categoriesController');
const { required, isEmpty } = require('./middlewares/loginMiddleware');
const { validToken } = require('./middlewares/tokenMiddleware');

const app = express();
app.use(express.json());

app.use('/user', userController);
app.use('/login', required, isEmpty, loginController);
app.use('/categories', validToken, categoriesController);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`ouvindo porta ${port}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
