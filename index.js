const express = require('express');
const bodyParser = require('body-parser');

const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const categoyController = require('./controllers/categoryController');

const app = express();
app.use(bodyParser.json());
app.use('/user', userController);
app.use('/login', loginController);
app.use('/categories', categoyController);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
