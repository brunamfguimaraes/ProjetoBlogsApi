const express = require('express');
const { BlogPost, Category, User } = require('../models');
const { validatePost } = require('../helpers/validate');

const SERVER_ERROR_MESSAGE = 'Internal Server Error';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const posts = await BlogPost.findAll({
      include: [{ model: User,
        as: 'user',
        attributes: { exclude: ['password'] } },
        // through: { attributes: [] } },
      { model: Category, as: 'categories' },
      { model: Category, as: 'categories', through: { attributes: [] } }],
    });

    return res.status(200).json(posts);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: SERVER_ERROR_MESSAGE });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await BlogPost.findByPk(id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Category, as: 'categories', through: { attributes: [] } },
      { model: User, as: 'users', through: { attributes: [] } }],
    });

    if (!post) return res.status(404).json({ message: 'Post does not exist' });

    return res.status(200).json(post);
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
  const { id } = req.user;
  const { categoryIds, ...data } = req.body;
  data.userId = id;
  const message = validatePost(req.body);
  if (message) return res.status(400).json({ message });

  try {
    const newPost = await BlogPost.create(data);
    const categories = await Category.findAll({ where: { id: categoryIds } });
    if (categories.length === 0) {
      return res.status(400).json({ message: '"categoryIds" not found' });
    }
    await newPost.addCategories(categories);
    return res.status(201).json({ id: newPost.id, ...data });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: SERVER_ERROR_MESSAGE });
  }
});

router.put('/:id', async (req, res) => {
  const message = validatePost(req.body);
  if (message) return res.status(400).json({ message });
  try {
    const { id } = req.params;

    const [updatePost] = await BlogPost.update(
      req.body,
      { where: { id } },
    );
    if (!updatePost) return res.status(404).json({ message: 'Post não encontrado' });

    return res.status(200).json({ message: 'Post atualizado com sucesso!' });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: SERVER_ERROR_MESSAGE });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletePost = await BlogPost.destroy(
      { where: { id } },
    );

    console.log(deletePost);

    return res.status(200).json({ message: 'Post excluído com sucesso!' });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: SERVER_ERROR_MESSAGE });
  }
});

module.exports = router;
