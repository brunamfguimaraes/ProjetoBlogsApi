const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const userController = require('./controllers/userController');

const app = express();

app.use(bodyParser.json());
const { PORT } = process.env || 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => console.log('ouvindo porta 3000!'));

app.use(userController);
