const express = require('express');
const { requestCreateUser } = require('./controllers/User');

const {
  isValidName,
  isValidEmail,
  isValidPassword,
  uniqueEmail,
} = require('./middlewares');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user',
  isValidName,
  isValidEmail,
  isValidPassword,
  uniqueEmail,
  requestCreateUser);

app.listen(3000, () => console.log('ouvindo porta 3000!'));