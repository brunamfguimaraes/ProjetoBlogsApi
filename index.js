const express = require('express');

const app = express();

app.listen(3003, () => console.log('ouvindo porta 3003!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
