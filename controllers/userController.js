const express = require('express');
const { User } = require('../models');
const { validateUser } = require('../helpers/validate');
const validateJWT = require('../helpers/validateJWT');

const SERVER_ERROR_MESSAGE = 'Internal Server Error';

const router = express.Router();

router.get('/', validateJWT, async (_req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });

    return res.status(200).json(users);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: SERVER_ERROR_MESSAGE });
  }
});

router.get('/:id', validateJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ message: 'User does not exist' });

    return res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: SERVER_ERROR_MESSAGE });
  }
});

// URL a ser utilizada para o exemplo http://localhost:3000/user/search/1?email=aqui-o-email
// router.get('/search/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { email } = req.query;
//     const user = await User.findOne({ where: { id, email } });

//     if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

//     return res.status(200).json(user);
//   } catch (e) {
//     console.log(e.message);
//     res.status(500).json({ message: SERVER_ERROR_MESSAGE });
//   }
// });

router.post('/', async (req, res) => {
  const message = validateUser(req.body);
  if (message) return res.status(400).json({ message });
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user) return res.status(409).json({ message: 'User already registered' });

  try {
    const newUser = await User.create(req.body);

    return res.status(201).json(newUser);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: SERVER_ERROR_MESSAGE });
  }
});

router.put('/:id', async (req, res) => {
  const { displayName, email, password, image } = req.body;
  try {
    const { id } = req.params;

    const [updateUser] = await User.update(
      { displayName, email, password, image },
      { where: { id } },
    );

    console.log(updateUser);

    if (!updateUser) return res.status(404).json({ message: 'Usuário não encontrado' });

    return res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: SERVER_ERROR_MESSAGE });
  }
});

router.delete('/me', validateJWT, async (req, res) => {
  try {
    const { id } = req.user;
    await User.destroy(
      { where: { id } },
    );
    return res.status(204).json({ message: 'User deleted successfully' });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: SERVER_ERROR_MESSAGE });
  }
});

module.exports = router;
