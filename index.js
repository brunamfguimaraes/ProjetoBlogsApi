const express = require('express');
const { Users, Login } = require('./src/routes');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

app.use('/user', Users);
app.use('/login', Login);

// do not remove that endpoint, it is used by the evatuator
app.get('/', (request, response) => {
  response.send();
});
