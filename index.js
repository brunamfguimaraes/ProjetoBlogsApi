const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const Middlewares = require('./middlewares');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user', routes.RoutesUsers);
app.use('/login', routes.RouteLogin);
app.use('/categories', routes.RoutesCategories);
app.use('/post', routes.RoutesPosts);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(Middlewares.errorMiddlewares);
