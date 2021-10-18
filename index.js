const express = require('express');

const app = express();
const user = require('./routes/user');

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.get('/', (request, response) => {
  response.send();
});

app.use('/user', user)