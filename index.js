// require('dotenv/config');
const express = require('express');
const validationError = require('./src/middlewares/validations/error');
const userRoute = require('./src/routes/userRouter');

const loginRouter = require('./src/routes/loginRouter');
// comentário apra subir requisito 1

// const { PORT } = process.env;

const app = express();
app.use(express.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userRoute);
app.use('/login', loginRouter);

app.use(validationError);

module.exports = app;
