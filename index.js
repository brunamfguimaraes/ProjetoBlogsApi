const express = require('express');

const rota = require('./routes/rota66');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', rota);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
