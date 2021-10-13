require('dotenv').config();
const express = require('express');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
