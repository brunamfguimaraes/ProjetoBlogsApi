const express = require('express');

const app = express();

require('dotenv').config();
// app.listen(3000, () => console.log('ouvindo porta 3000!'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
// iniciando projeto
