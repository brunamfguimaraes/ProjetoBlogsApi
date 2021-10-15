const express = require('express');
const bodyParser = require('body-parser');
const { 
  userRouter, 
  // loginRouter,
} = require('./src/routers');
const { errorMiddleware } = require('./src/middlewares');

const app = express();

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));

// não remova esse endpoint, e para o avaliador funcionar!!!
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userRouter);

app.use(errorMiddleware);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
