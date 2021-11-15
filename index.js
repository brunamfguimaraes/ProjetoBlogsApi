require('dotenv').config();
const express = require('express');
const { LoginRouter,
        UserRouter,
        PostRouter,
        CategoryRouter,
      } = require('./src/routers');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || '3000';

app.listen(PORT, () => console.log(`Online at port ${PORT}`));

app.use('/user', UserRouter);
app.use('/login', LoginRouter);
app.use('/post', PostRouter);
app.use('/categories', CategoryRouter);

app.get('/', (request, response) => {
  response.send();
});
