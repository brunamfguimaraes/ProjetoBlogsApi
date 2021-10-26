const express = require('express');
const { userRouter } = require('./controllers/userController');
const { loginRouter } = require('./controllers/loginController');
const { categoriesRouter } = require('./controllers/categoriesController');
const { postRouter } = require('./controllers/postController');
require('dotenv').config();

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// ------------------------------------------------------------------
// Requisitos 1, 3, 4 e 12: Rota User

app.use('/user', userRouter);

// ------------------------------------------------------------------
// Requisito 2: Rota Login

app.use('/login', loginRouter);

// ------------------------------------------------------------------
// Requisitos 5 e 6: Rota Categories

app.use('/categories', categoriesRouter);

// ------------------------------------------------------------------
// Requisitos 7, 8, 9, 10, 11 e 13: Rota Post

app.use('/post', postRouter);

// ------------------------------------------------------------------

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));