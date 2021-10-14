const express = require('express');
require('dotenv').config();

const usersRoutes = require('./routers/userRoutes');

const { PORT } = process.env;

const app = express();
app.use(express.json());

app.use('/user', usersRoutes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}`));