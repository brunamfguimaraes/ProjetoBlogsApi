const express = require('express');

const app = express();

const userRoute = require('./src/controller/User');

const loginRoute = require('./src/controller/Login');

const categoriesRoute = require('./src/controller/Categories');

app.use('/user', userRoute);

app.use('/login', loginRoute);

app.use('/categories', categoriesRoute);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
