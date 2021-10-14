const express = require('express');
const { User } = require('./models');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const createUser = await User.create({ displayName, email, password, image });

    return res.status(201).json(createUser);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));