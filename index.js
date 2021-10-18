const express = require('express');

const userRouter = require('./routers/userRouter');
const loginRouter = require('./routers/loginRouter');

const app = express();
app.use(express.json());

app.use('/user', userRouter);
app.use('/login', loginRouter);

app.use((err, _req, res, _next) => res.status(err.status).json(err.error));

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
