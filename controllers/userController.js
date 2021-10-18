const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { valdateJwt, validateUserName, validateEmail, validatePassword } = require('../midlewares');

const secret = 'secretToken';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const router = express.Router();
const ALGO_DEU_ERRADO = 'Algo deu errado';

router.get('/', valdateJwt, async (_req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: ALGO_DEU_ERRADO });
  }
});

router.get('/:id', valdateJwt, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ message: 'User does not exist' });

    return res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: ALGO_DEU_ERRADO });
  }
});

router.post('/', validateUserName, validateEmail, validatePassword, async (req, res) => {
  try {
    const { dataValues } = await User.create(req.body);
    delete dataValues.password;
    const token = jwt.sign({ data: dataValues }, secret, jwtConfig);
    return res.status(201).json({ token });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: ALGO_DEU_ERRADO });
  }
});

// Este endpoint usa o método destroy do Sequelize para remover um usuário no banco.
// router.delete('/me', valdateJwt, async (req, res) => {
//   const token = req.header.athorization;
//   console.log(token);
//   try {
//     const deleteUser = await User.destroy(
//       { where: token }, verificar se consigo adicionar o token no objeto do user
//     );
//     return res.status(204).json({ message: 'Usuário excluído com sucesso!' });
//   } catch (e) {
//     console.log(e.message);
//     res.status(500).json({ message: ALGO_DEU_ERRADO });
//   }
// });

module.exports = router;
