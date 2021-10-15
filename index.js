const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const { controllerUser } = require('./controller/controllerUser');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));

app.post('/user', controllerUser);
