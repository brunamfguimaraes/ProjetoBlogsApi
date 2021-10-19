const express = require('express');
const bodyParser = require('body-parser');
const { userRouter } = require('./controllers/userController');
const { loginRouter } = require('./controllers/loginController');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// ------------------------------------------------------------------
// Requisitos 1 Rota de User

app.use('/user', userRouter);

// ------------------------------------------------------------------
// Requisitos 2 Rota de Login

app.use('/login', loginRouter);

// ------------------------------------------------------------------

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));