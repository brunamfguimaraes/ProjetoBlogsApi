const express = require('express');
const bodyParser = require('body-parser');

const { validateToken } = require('./middlewares/UserMiddleware');

const app = express();
const userController = require('./controller/userController');
const categoryController = require('./controller/categoryController');

app.use(bodyParser.json());
// app.use(express.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.post('/categories', validateToken, categoryController.createCategory);
app.post('/user', userController.createUser);
app.post('/login', userController.loginUser);
app.get('/user/:id', validateToken, userController.getUserById);
app.get('/user', validateToken, userController.getAllUsers);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
