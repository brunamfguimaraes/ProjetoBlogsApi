require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('./src/api/routes/userRoute');
const loginRoute = require('./src/api/routes/loginRoute');
const categoriesRoute = require('./src/api/routes/categoriesRoute');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/user', userRoute);
app.use('/login', loginRoute);
app.use('/categories', categoriesRoute);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));