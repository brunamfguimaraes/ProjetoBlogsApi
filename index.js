const express = require('express');
require('dotenv').config();

const User = require('./api/controllers/User');
const errorMiddleware = require('./api/middlewares/errorMiddleware');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

app.post('/user', User.registerNewUser);

// não remova esse endpoint, ele é necessário para fazer o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(errorMiddleware);
