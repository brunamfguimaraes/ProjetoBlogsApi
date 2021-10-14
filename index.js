const express = require('express');
const userRoute = require('./routes/userRoute');
const middlewareErrors = require('./middlewares/errors');

const app = express();
app.use(express.json());
app.use('/user', userRoute);
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(middlewareErrors);

app.listen(3000, () => console.log('ouvindo porta 3000!'));