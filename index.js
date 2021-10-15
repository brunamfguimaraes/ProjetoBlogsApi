const express = require('express');
const users = require('./controllers/User');
const login = require('./controllers/Login');
const categories = require('./controllers/Categorie');
const post = require('./controllers/BlogPost');
const { errMiddlware } = require('./middlewares');

const app = express();

app.use(express.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', users);
app.use('/login', login);
app.use('/categories', categories);
app.use('/post', post);

app.use(errMiddlware);