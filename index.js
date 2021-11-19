require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const UserRouter = require('./src/routes/userRouter');
const CategoryRouter = require('./src/routes/categoryRouter');
const PostRouter = require('./src/routes/postRouter');
const errorMiddleware = require('./src/midd/error');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

app.use(UserRouter);
app.use(CategoryRouter);
app.use(PostRouter);

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`ouvindo porta ${3000}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});