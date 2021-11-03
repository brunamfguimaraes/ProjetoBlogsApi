const express = require('express');

const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, é necessário para fazer o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
