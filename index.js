const express = require('express');
const bodyParser = require('body-parser').json();

const app = express();

app.use(express.json());
app.use(bodyParser);

const userRouter = require('./routers/userRouter');
const loginRouter = require('./routers/loginRouter');
const categoriesRouter = require('./routers/categoriesRouter');

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/categories', categoriesRouter);

// Necessário para uso de middlewares
// app.use((err, req, res, _next) => 
// res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`));

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}`));
