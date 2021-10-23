const express = require('express');
const bodyParser = require('body-parser');

const router = require('./src/routes');
const middlewere = require('./src/middleweres');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', router.User);
app.use('/login', router.Login);
app.use('/categories', router.Category);
app.use('/post', router.Post);

app.use(middlewere.error);
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
