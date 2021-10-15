const express = require('express');
const Users = require('./src/routes/Users');

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

app.use('/user', Users);

// do not remove that endpoint, it is used by the evatuator
app.get('/', (request, response) => {
  response.send();
});
