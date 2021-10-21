const express = require('express');

const usersRoutes = require('./routers/userRoutes');
const loginRoutes = require('./routers/loginRoutes');
const categoriesRoutes = require('./routers/categoriesRoutes');

const app = express();
app.use(express.json());

app.use('/login', loginRoutes);
app.use('/user', usersRoutes);
app.use('/categories', categoriesRoutes);
//
app.listen(3000, () => console.log('ouvindo porta 3000'));
//

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});