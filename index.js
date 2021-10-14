const express = require('express');
const usersRouter = require('./routes/usersRouter');
const loginRouter = require('./routes/loginRouter');

const app = express();

app.use(express.json());
app.use('/user', usersRouter);
app.use('/login', loginRouter);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
