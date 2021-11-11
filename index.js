const express = require('express');
const route = require('./src/routes');
const error = require('./src/middlewares/error');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

route.categorie(app);
route.blogPost(app);
route.user(app);

app.use(error);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
