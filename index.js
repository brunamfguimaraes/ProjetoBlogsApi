const express = require('express');

const app = express();

const userRouter = require('./src/api/routes/userRouter');
const error = require('./src/api/middlewares/error');

app.use(express.json());
app.use('/user', userRouter);

app.use(error);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
