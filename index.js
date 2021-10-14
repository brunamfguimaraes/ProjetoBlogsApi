require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));

// não remova esse endpoint, e para o avaliador funcionar.
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', );