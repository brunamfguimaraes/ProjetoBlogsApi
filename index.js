require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const User = require('./routes/userRoutes');
const login = require('./routes/loguin');
const CategoryRoute = require('./routes/category');
const Post = require('./routes/Post');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send('');
});

// app.use('/user', userRoutes.test);
app.use('/user', User);
app.use('/login', login);
app.use('/post', Post);
app.use('/categories', CategoryRoute);
app.listen(PORT, () => console.log(' Sequelado fino na porta 3000!'));
