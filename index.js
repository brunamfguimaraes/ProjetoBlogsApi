const express = require('express');
const erro = require('./middlewares/erro');
const route = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', route.user);
app.use('/login', route.login);
app.use('/post', route.post);
app.use('/categories', route.categories);

app.use(erro);

app.listen(PORT, () => console.log('ouvindo porta 3000!'));
