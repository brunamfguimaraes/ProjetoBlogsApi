const express = require('express');
const { userRoute } = require('./src/routes');

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Online at port ${PORT}!`));

// do not remove this endpoint, it is for the evaluator to work correctly
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userRoute);