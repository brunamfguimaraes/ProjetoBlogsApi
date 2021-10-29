const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const categorieController = require('./controllers/categorieController');
const blogPostController = require('./controllers/blogPostController');

const app = express();

app.use(bodyParser.json());

app.use('/user', userController);
app.use('/login', loginController);
app.use('/categories', categorieController);
app.use('/post', blogPostController);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
