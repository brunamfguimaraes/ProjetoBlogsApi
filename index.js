require('dotenv/config');
const express = require('express');
const Users = require('./routes/Users');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(3000, () => console.log(`rodandno fino na porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send('bagui é doido, la vamos nos dnv #vqv');
});

app.use('/user', Users);
