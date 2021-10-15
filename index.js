const express = require('express');
const bodyParser = require('body-parser');

const userController = require('./controllers/userController');

const app = express();
app.use(bodyParser.json());

app.use('/user', userController);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`ouvindo porta ${port}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
