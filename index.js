const express = require('express');
const bodyParser = require('body-parser');
const error = require('./src/api/middleware/error/error');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const routerUser = require('./src/api/route/routeUser');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', routerUser);

app.use(error);
