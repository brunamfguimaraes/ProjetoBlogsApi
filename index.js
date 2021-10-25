const express = require('express');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const blogPostRoutes = require('./routes/blogpostRoutes');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/login', loginRoutes);
app.use('/user', userRoutes);
app.use('/categories', categoriesRoutes);
app.use('/post', blogPostRoutes);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
