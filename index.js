const express = require('express');
const { userRoute, loginRoute } = require('./src/routes');

const app = express();
app.use(express.json());

app.listen(3000, () => console.log('Online at port 3000!'));

// do not remove this endpoint, it is for the evaluator to work correctly
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userRoute);
app.use('/login', loginRoute);