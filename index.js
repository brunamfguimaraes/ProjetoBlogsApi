const express = require('express');
const {   
categoryRouter,
loginRouter,
userCRouter,
blogPostRouter,
} = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/user', userCRouter);
app.use('/login', loginRouter);
app.use('/categories', categoryRouter);
app.use('/post', blogPostRouter);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
