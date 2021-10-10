const express = require('express');

const app = express();

const route = require('./src/route/route');

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', async (req, res) => {
  /* const { email } = req.body;
  console.log(email); */
  res.status(201).json('oddi');
});

/* app.use(route); */