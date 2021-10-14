const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const userController = require('./controller/userController');

app.use(bodyParser.json());
// app.use(express.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.post('/user', userController.createUser);
app.post('/login', userController.LoginUser);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
