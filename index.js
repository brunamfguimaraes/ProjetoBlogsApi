const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar

app.get('/', (_request, response) => {
  response.send();
});

const userRouter = require('./routers/userRouter');

app.use('/', userRouter);

const categoryRouter = require('./routers/categoryRouter');

app.use('/', categoryRouter);

const postRouter = require('./routers/postRouter');

app.use('/', postRouter);

app.listen(3000, () => console.log('ouvindo porta 3000!'));