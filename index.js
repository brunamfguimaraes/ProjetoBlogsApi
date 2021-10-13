const express = require('express');

const app = express();

const port = 3000;
app.listen(port, () => console.log(`ouvindo porta ${port}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
