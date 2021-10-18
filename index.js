const express = require('express');
const { requestCreateCategory } = require('./controllers/Category');

const requestLogin = require('./controllers/Login');

const {
  requestCreateUser,
  requestUserList,
  requestDataUser,
} = require('./controllers/User');

const {
  passwordRequired,
  emailRequired,
} = require('./middlewares/loginMiddlewares');

const { verifyToken } = require('./middlewares/tokenValidation');

const {
  isValidName,
  isValidEmail,
  isValidPassword,
  uniqueEmail,
  categoryName,
} = require('./middlewares/userMiddlewares');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/user/:id', verifyToken, requestDataUser);

app.get('/user', verifyToken, requestUserList);

app.post('/login',
  emailRequired,
  passwordRequired,
  requestLogin);

app.post('/user',
  isValidName,
  isValidEmail,
  isValidPassword,
  uniqueEmail,
  requestCreateUser);

app.post('/categories', verifyToken, categoryName, requestCreateCategory);

app.listen(3000, () => console.log('ouvindo porta 3000!'));