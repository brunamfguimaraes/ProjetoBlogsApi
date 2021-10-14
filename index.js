const express = require('express');
// const bodyParser = require('body-parser');
const userController = require('./controllers/userController');

const { 
  validateDisplayName, validatePassword, validateEmail,
 } = require('./middlewares/userValidations');

const app = express();
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/user', validateDisplayName, validatePassword, validateEmail, userController);
app.post('/login', validateEmail, validatePassword, userController);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
