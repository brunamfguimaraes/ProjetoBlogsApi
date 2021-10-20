require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send('');
});

// app.use('/user', userRoutes.test);
app.use('/user', userRoutes);

app.listen(PORT, () => console.log(' Sequelado fino na porta 3000!'));
