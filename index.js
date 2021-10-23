const express = require('express');
const bodyParser = require('body-parser');

const router = require('./src/routes');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', router.User);
app.use('/login', router.Login);
app.use('/categories', router.Categories);
app.use('/post', router.blogPost);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
