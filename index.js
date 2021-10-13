const express = require('express');
require('dotenv').config();

const app = express();
const userRoutes = require('./routes/users.route');
const loginRoutes = require('./routes/login.route');
const categoryRoutes = require('./routes/category.route');
const postRoutes = require('./routes/blogPost.route');
const error = require('./middlewares/error');

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.use('/user', userRoutes);
app.use('/login', loginRoutes);
app.use('/categories', categoryRoutes);
app.use('/post', postRoutes);
app.use(error);

app.listen(3000, () => console.log(`ouvindo na porta ${PORT}`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
