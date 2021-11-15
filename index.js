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

// Agradecimentos especiais ao meu amigo de turma Leandro Reis, turma 10-B, que me ajudou no entendimento de alguns pontos importantes no funcionamento do projeto, me permitindo olhar sua PR, com a qual, mesmo com dificuldade, consegui concluir o projeto. Obrigado, Leandro!
// PR do Leandro: https://github.com/tryber/sd-010-b-project-blogs-api/pull/52

app.get('/', (request, response) => {
  response.send();
});
