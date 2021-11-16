const express = require('express');

const userController = require('./controllers/users');

const port = process.env.PORT || 3001;

const {
  validateDisplayName,
  validateEmail,
  validatePassword, 
} = require('./middlewares/validateNewUser');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', validateDisplayName, validateEmail, validatePassword, userController);

app.listen(port, () => console.log(`ouvindo porta ${port}`));