const express = require('express');
const router = require('./src/routers/UserRouter');

const app = express();
app.use(express.json());

app.listen(3000, () => console.log('Online at port 3000'));

app.use('/user', router);
app.use('/login', router);

app.get('/', (request, response) => {
  response.send();
});
