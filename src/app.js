const express = require('express');
const { userRoute, loginRoute, categoriesRoute, postRoute } = require('./routes');

const app = express();
app.use(express.json());

app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userRoute);
app.use('/login', loginRoute);
app.use('/categories', categoriesRoute);
app.use('/post', postRoute);

module.exports = app;