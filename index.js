const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`app rodando na porta ${PORT}`));