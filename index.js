const express = require('express');
const bodyParser = require('body-parser');

const userRouter = require('./src/routers/UserRouter');
const error = require('./src/middlewares/error');

const app = express();
app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

userRouter(app);

app.use(error);

app.listen(3000, () => console.log('listening at port 3000!'));
