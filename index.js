const express = require('express');
const bodyParser = require('body-parser');
const { userRouter } = require('./controllers/userController');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// ------------------------------------------------------------------
// Requisitos 1 Rota de Users

app.use('/user', userRouter);

// ------------------------------------------------------------------
// Requisitos 2 Rota de Login

app.use('/login', userRouter);

// ------------------------------------------------------------------

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`ouvindo porta ${port}!`));