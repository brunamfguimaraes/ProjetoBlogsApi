const express = require('express');
require('dotenv').config();

const User = require('./api/controllers/User');
const errorMiddleware = require('./api/middlewares/errorMiddleware');

const app = express();
app.use(express.json());

// app.listen(3000, () => console.log('ouvindo porta 3000!'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

app.post('/user', User.registerNewUser);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(errorMiddleware);
// iniciando projeto
