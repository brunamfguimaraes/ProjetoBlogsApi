const express = require('express');
require('dotenv').config();

const usersRoutes = require('./routers/userRoutes');
const loginRoutes = require('./routers/loginRoutes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

app.use('/user', usersRoutes);
app.use('/login', loginRoutes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(port, () => console.log(`ouvindo porta ${port}`));