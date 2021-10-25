const express = require('express');
const bodyParser = require('body-parser');
const {   
  categoryController,
  login,
  userController,
  blogPost,
 } = require('./controllers');

const { userMailLogin, userPasswordLogin, validateUser } = require('./midlewares');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/user', userController);
app.use('/login', userMailLogin, userPasswordLogin, validateUser, login);
app.use('/categories', categoryController);
app.use('/post', blogPost);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
