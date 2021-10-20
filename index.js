const express = require('express');
const bodyParser = require('body-parser');
const { User } = require('./src/models');
const route = require('./src/routes');

const error = require('./src/middlewares/error');

const app = express();
app.use(bodyParser.json());

app.get('/teste', async (req, res) => {
  const result = await User.create({ displayName: 'teste', email: 'teste@teste.com', password: '123' });
  res.json(result);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

route.user(app);
route.category(app);
route.blogPost(app);

app.use(error);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
