const express = require('express');
require('dotenv').config();

const usersRoutes = require('./routers/userRoutes');
const loginRoutes = require('./routers/loginRoutes');
const categoriesRoutes = require('./routers/categoriesRoutes');

const app = express();
app.use(express.json());

app.use('/login', loginRoutes);
app.use('/user', usersRoutes);
app.use('/categories', categoriesRoutes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(process.env.PORT || 3000, () => console.log(`ouvindo porta ${process.env.PORT}`));