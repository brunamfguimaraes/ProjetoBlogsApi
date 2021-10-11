const express = require('express');
const handleErrors = require('./middlewares/handleErrors');
const userRoutes = require('./User/userRoutes');
const userController = require('./User/userController');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userRoutes);
app.post('/login', userController.login);

app.use(handleErrors);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
