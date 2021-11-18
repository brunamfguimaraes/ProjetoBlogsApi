const express = require('express');

require('dotenv').config();

const routes = require('./routes');
const errorsMiddleware = require('./middlewares/errors');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/', routes);

app.use(errorsMiddleware);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`ouvindo porta ${port}!`));
