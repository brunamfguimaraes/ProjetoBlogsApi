const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const apiRoutes = express.Router();

app.use(express.json());

app.use(apiRoutes);

app.use(express.urlencoded({
  extended: false,
}));

const routes = require('./routes');

const authMiddleware = require('./validateJWT');

const {
  validateEmail,
  checkDisplayName,
  checkPassword,
} = require('./routes');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

apiRoutes.get('/user', authMiddleware, routes.getAllUsers);
apiRoutes.post('/user', validateEmail, checkDisplayName, checkPassword, routes.createUser);
apiRoutes.post('/login', validateEmail, checkPassword, routes.login);
apiRoutes.get('/user/:id', authMiddleware, routes.getUserById);

app.listen(3000, () => console.log('Ouvindo na porta 3000!'));
