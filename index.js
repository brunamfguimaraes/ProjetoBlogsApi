const express = require('express');
const usersRouters = require('./routers/usersRouters');
const loginRouter = require('./routers/loginRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/login', loginRouter);
app.use('/user', usersRouters);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
