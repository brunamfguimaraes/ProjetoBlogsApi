const express = require('express');
const UserRouter = require('./src/controllers/userController');

const app = express();
app.use(express.json());

app.use('/user', UserRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));
