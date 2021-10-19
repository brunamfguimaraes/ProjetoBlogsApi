const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const user = require('./routes/user');
const login = require('./routes/login');
const category = require('./routes/category');
const blogpost = require('./routes/blogpost');

app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.get('/', (_request, response) => {
  response.send();
});

app.use('/user', user);
app.use('/login', login);
app.use('/categories', category);
app.use('/post', blogpost);
