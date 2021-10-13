const express = require('express');
const bodyParser = require('body-parser');
const { userRouter, loginRouter } = require('./src/routers');

const app = express();
app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/login', loginRouter);

app.use((error, _req, res, _next) => {
  res.status(error.status).json({ message: error.message });
});

app.listen(3000, () => console.log('rodando na porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
