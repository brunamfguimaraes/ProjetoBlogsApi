const express = require('express');
const { User, Login, getUsers } = require('./controller/user');
const validateJWT = require('./auth/validateJWT');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.route('/user')
  .post(User)
  .get(validateJWT, getUsers);
app.route('/login').post(Login);
