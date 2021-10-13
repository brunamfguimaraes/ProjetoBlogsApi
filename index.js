require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', routes.users);

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
