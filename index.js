const express = require('express');

const app = express();

app.use(express.json());

const userRouter = require('./routers/userRouter');
const categoryRouter = require('./routers/categoryRouter');
const blogpostRouter = require('./routers/blogpostRouter');

app.use(userRouter);
app.use(categoryRouter);
app.use(blogpostRouter);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
