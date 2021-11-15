const express = require('express');
const { LoginRouter,
        UserRouter,
        PostRouter,
        CategoryRouter,
      } = require('./src/routers');

const app = express();
app.use(express.json());

app.listen(3000, () => console.log('Online at port 3000'));

app.use('/user', UserRouter);
app.use('/login', LoginRouter);
app.use('/post', PostRouter);
app.use('/categories', CategoryRouter);

app.get('/', (request, response) => {
  response.send();
});
