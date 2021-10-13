const express = require('express');

const app = express();
const userRouter = require('./controller/userController');
const loginRouter = require('./controller/loginController');

app.use(express.json());

app.use('/user', userRouter);
app.use('/login', loginRouter);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
