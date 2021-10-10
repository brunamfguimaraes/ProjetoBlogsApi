const express = require('express');

const app = express();
require('dotenv').config();

const bodyParser = require('body-parser');
const userRoute = require('./src/api/routes/userRoute');

app.use(bodyParser.json());

app.use('/user', userRoute);

const PORT = process.env.PORT || 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));