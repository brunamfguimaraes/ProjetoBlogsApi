require('dotenv').config();
const express = require('express');
const bodyParse = require('body-parser');
const userController = require('./controllers/userController');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParse.json());

app.get('/', (request, response) => {
  response.send();
});

app.get('/user/:id', userController.findById);
app.get('/user', userController.findUsers);
app.post('/user', userController.createUser);
app.post('/login', userController.findLogin);

app.use((err, _req, res, _next) => res.status(err.status).json({ message: err.message }));

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
