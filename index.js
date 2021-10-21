const express = require('express');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoutes');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/login', loginRoutes);
app.use('/user', userRoutes);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// O que já foi feito:

// implementação da estrutura do sequelize, como models, migration e seeders
// criação e população do banco de dados
// middleware de validação do usuário (userValidation)

// ------------------------------------------

// Próximos passos:

// implementar o controller do login e assim gerar o token do usuário (req 2)
// token necessário para adicionar um usuário à tabela Users (req 1)