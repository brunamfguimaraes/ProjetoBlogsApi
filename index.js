const express = require('express');
require('dotenv').config();

const UserRouter = require('./src/routes/userRouter');
const { User } = require('./src/sequelize/models');

const app = express();
app.use(express.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/user', (req, res) => {
  User.findAll().then((data) => {
    res.status(200).json(data);
  }).catch((e) => {
    console.log(e.message);
    res.status(500).json({ message: 'deu ruim!!!' });
  });
});

app.use('/user', UserRouter);

module.exports = app;