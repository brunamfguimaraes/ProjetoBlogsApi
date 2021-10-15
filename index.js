require('dotenv/config');
const express = require('express');
const validationError = require('./src/middlewares/validations/error');

const userRoute = require('./src/routes/userRouter');
const loginRouter = require('./src/routes/loginRouter');
const categoryRouter = require('./src/routes/categoryRouter');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userRoute);
app.use('/login', loginRouter);
app.use('/categories', categoryRouter);

app.use(validationError);

module.exports = app;
