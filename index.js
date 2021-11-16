const express = require('express');

const { User } = require('./src/database/models');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/user', async (request, response) => {
    const user = await User.findOne({ where: { id: 1 } });
  
    response.status(200).send(user);
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));
