const express = require('express');

const app = express();

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// do not remove this endpoint, it is for the evaluator to work correctly
app.get('/', (request, response) => {
  response.send();
});
