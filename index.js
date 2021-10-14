const express = require('express');

const app = express();
const userRouter = require('./routers/userRouter');
const loginRouter = require('./routers/loginRouter');

app.listen(3000, () => console.log('ouvindo porta 3000!'));
app.use(express.json());
app.use('/user', userRouter);
app.use('/login', loginRouter);

app.get('/', (request, response) => {
  response.send();
});
