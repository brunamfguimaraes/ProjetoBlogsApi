const express = require('express');

const app = express();
const userRoutes = require('./routes/users.route');
const error = require('./middlewares/error');

app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}`));

app.use('/user', userRoutes);
app.use(error);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
