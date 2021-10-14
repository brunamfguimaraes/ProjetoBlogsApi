const express = require('express');

const app = express();
const userRouter = require('./routers/userRouter');

app.listen(3000, () => console.log('ouvindo porta 3000!'));
app.use(express.json());
app.use('/user', userRouter);

app.get('/', (request, response) => {
  response.send();
});
