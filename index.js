const express = require('express');

const routes = require('./routes');

const app = express();

const PORT = process.env.PORT || 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
//---------------------------------------------------------

app.use(routes);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
