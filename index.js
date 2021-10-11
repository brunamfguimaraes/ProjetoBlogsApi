const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');

const { PORT } = process.env;

const app = express();

app.use(bodyParser.json());

app.post('/login', loginController);
app.use('/user', userController);
app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
