const express = require('express');

const usersRoute = require('./routes/usersRoute');
const loginRoute = require('./routes/loginRoute');
const blogpostsRoute = require('./routes/blogpostsRoute');
const categoriesRoute = require('./routes/categoriesRoute');

const app = express();

app.use(express.json());
app.use('/user', usersRoute);
app.use('/login', loginRoute);
app.use('/post', blogpostsRoute);
app.use('/categories', categoriesRoute);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
