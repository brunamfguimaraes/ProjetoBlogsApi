const express = require('express');
const { Category } = require('../models');
const { validateCategory } = require('../helpers/validate');

const SERVER_ERROR_MESSAGE = 'Internal Server Error';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const categories = await Category.findAll();

    return res.status(200).json(categories);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: SERVER_ERROR_MESSAGE });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) return res.status(404).json({ message: 'Category does not exist' });

    return res.status(200).json(category);
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
//     const user = await Category.findOne({ where: { id, email } });

//     if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

//     return res.status(200).json(user);
//   } catch (e) {
//     console.log(e.message);
//     res.status(500).json({ message: SERVER_ERROR_MESSAGE });
//   }
// });

router.post('/', async (req, res) => {
  const message = validateCategory(req.body);
  if (message) return res.status(400).json({ message });
  // const category = await Category.findOne({ where: { name: req.body.name } });
  // if (category) return res.status(409).json({ message: 'Category already registered' });

  try {
    const newCategory = await Category.create(req.body);

    return res.status(201).json(newCategory);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: SERVER_ERROR_MESSAGE });
  }
});

// router.put('/:id', async (req, res) => {
//   const { displayName, email, password, image } = req.body;
//   try {
//     const { id } = req.params;

//     const [updateUser] = await Category.update(
//       { displayName, email, password, image },
//       { where: { id } },
//     );

//     console.log(updateUser);

//     if (!updateUser) return res.status(404).json({ message: 'Usuário não encontrado' });

//     return res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
//   } catch (e) {
//     console.log(e.message);
//     res.status(500).json({ message: SERVER_ERROR_MESSAGE });
//   }
// });

// router.delete('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleteUser = await Category.destroy(
//       { where: { id } },
//     );

//     console.log(deleteUser);

//     return res.status(200).json({ message: 'Usuário excluído com sucesso!' });
//   } catch (e) {
//     console.log(e.message);
//     res.status(500).json({ message: SERVER_ERROR_MESSAGE });
//   }
// });

module.exports = router;
