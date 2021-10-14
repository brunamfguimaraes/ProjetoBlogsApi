const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const user = require('./routers/userRouter');
const login = require('./routers/loginRouter');

app.use('/user', user);

app.use('/login', login);

app.listen(3000, () => console.log('ouvindo porta 3000!'));