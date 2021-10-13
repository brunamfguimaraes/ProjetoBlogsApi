require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const UserRouter = require('./src/routers/UserRouter');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(UserRouter);

app.listen(PORT, () => console.log(`ouvindo porta ${3000}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
