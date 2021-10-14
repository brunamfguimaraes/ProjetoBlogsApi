const express = require('express');
const { userRouter, loginRouter, categoriesRouter } = require('./routes');
const error = require('./middlewares/error');

const app = express();

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.use(express.json());

app.use('/user', userRouter);

app.use('/login', loginRouter);

app.use('/categories', categoriesRouter);

app.use(error);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// Agradecimento a Raphael Gumieri Turma 10 - Tribo B, Lucas Martins Turma 10 - Tribo B, Ederson Rodriges Turma 10 - Tribo B Pelo Auxilio na criação de tabelas e na estruturação de middlewares.