const express = require('express');
const bodyParser = require('body-parser');
const routers = require('./routers');
const middlewares = require('./middlewares');

const app = express();

app.use(bodyParser.json());

app.use('/user', routers.userRouter);

app.use(middlewares.errorMiddleware);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.get('/', (request, response) => {
  response.send();
});
