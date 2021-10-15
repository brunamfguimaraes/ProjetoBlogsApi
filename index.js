const express = require('express');

const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const categoriesController = require('./controllers/categoriesController');
const validateJWT = require('./middlewares/validateJWT');

const app = express();
app.use(express.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', userController);
app.post('/login', loginController);
app.get('/user/:id', validateJWT, userController); 
app.get('/user', validateJWT, userController);
app.post('/categories', validateJWT, categoriesController); 
