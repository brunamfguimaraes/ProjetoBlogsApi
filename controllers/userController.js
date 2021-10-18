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
// const existentUserError = { message: 'User already registered' };

router.get('/', valdateJwt, async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: ALGO_DEU_ERRADO });
  }
});

// router.get('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await Users.findByPk(id);

//     if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

//     return res.status(200).json(user);
//   } catch (e) {
//     console.log(e.message);
//     res.status(500).json({ message: ALGO_DEU_ERRADO });
//   }
// });

// router.get('/search/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { email } = req.query;
//     const user = await Users.findOne({ where: { id, email } });

//     if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

//     return res.status(200).json(user);
//   } catch (e) {
//     console.log(e.message);
//     res.status(500).json({ message: ALGO_DEU_ERRADO });
//   }
// });

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

// router.put('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;

//     const [updateUser] = await Users.update(
//         req.body,
//       { where: { id } },
//     );

//     console.log(updateUser); 

//     if (!updateUser) return res.status(404).json({ message: 'Usuário não encontrado' });

//     return res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
//   } catch (e) {
//     console.log(e.message);
//     res.status(500).json({ message: ALGO_DEU_ERRADO });
//   }
// });

// // Este endpoint usa o método destroy do Sequelize para remover um usuário no banco.
// router.delete('/:id', async (req, res) => {
//   try {
//     const deleteUser = await Users.destroy(
//       { where: req.params },
//     );

//     console.log(deleteUser);
//     // confira o que é retornado quando o user com o id é ou não encontrado;

//     return res.status(200).json({ message: 'Usuário excluído com sucesso!' });
//   } catch (e) {
//     console.log(e.message);
//     res.status(500).json({ message: ALGO_DEU_ERRADO });
//   }
// });

module.exports = router;
