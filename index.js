const express = require('express');
// require('dotenv').config();
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const categoryController = require('./controllers/categoryController');

const validateJWT = require('./auth/validateJWT');

const app = express();

app.use(express.json());

// const PORT = process.env.PORT || 3000;
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});    

app.post('/user', userController.create);
app.use('/login', loginController);
app.get('/user', validateJWT, userController.getAll);
app.get('/user/:id', validateJWT, userController.getById);

app.post('/categories', validateJWT, categoryController.create);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
