require('dotenv').config();

const express = require('express');

const user = require('./router/user');
const login = require('./router/login');
const categories = require('./router/categories');
const post = require('./router/post');

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.use('/user', user);
app.use('/login', login);
app.use('/categories', categories);
app.use('/post', post);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(port, () => console.log(`ouvindo porta ${port}!`));
