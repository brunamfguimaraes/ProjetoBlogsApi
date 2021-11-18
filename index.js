const express = require('express');

const app = express();

const userRouter = require('./src/api/routes/userRouter');
const loginRouter = require('./src/api/routes/loginRouter');
const postRouter = require('./src/api/routes/postRouter');

const categoriesRouter = require('./src/api/routes/categoriesRouterRouter');

const error = require('./src/api/middlewares/error');

app.use(express.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/categories', categoriesRouter);
app.use('/post', postRouter);

app.use(error);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
