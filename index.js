const express = require('express');
// require('dotenv').config();
const userController = require('./controllers/userController');

const app = express();

app.use(express.json());

// const PORT = process.env.PORT || 3000;
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userController);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
