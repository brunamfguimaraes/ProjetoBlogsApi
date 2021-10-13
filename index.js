require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', routes.users);
app.use('/login', routes.login);
app.use('/categories', routes.categories);

app.use(middlewares.error);
const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
