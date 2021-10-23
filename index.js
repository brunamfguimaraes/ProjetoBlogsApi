const express = require('express');

const app = express();

const user = require('./routes/user');

app.use(express.json());
app.use('/user', user)

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
