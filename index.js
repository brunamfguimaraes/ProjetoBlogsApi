const express = require('express');
const { userRoute, loginRoute, categoriesRoute, postRoute } = require('./src/routes');

const app = express();
app.use(express.json());

app.listen(3000, () => console.log('listening to port 3000!'));

app.use('/user', userRoute);
app.use('/login', loginRoute);
app.use('/categories', categoriesRoute);
app.use('/post', postRoute);

// do not remove this endpoint, it is for the evaluator to work correctly
app.get('/', (request, response) => {
  response.send();
});
