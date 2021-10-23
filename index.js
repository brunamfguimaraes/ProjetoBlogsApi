const express = require('express');

const { user, login, getUsers, findUser } = require('./controller/user');
const validateToken = require('./auth/validateJWT');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.route('/login').post(login);
app.route('/user/:id').get(validateToken, findUser);
app.route('/user')
  .post(user)
  .get(validateToken, getUsers);
