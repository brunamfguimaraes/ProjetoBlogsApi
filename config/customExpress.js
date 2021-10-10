const express = require('express');
const { userRoute } = require('../routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoute);

app.get('/', (request, response) => {
  response.send();
});

module.exports = app;