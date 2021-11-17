const express = require('express');
const Auth = require('../middlewares/auth');
const { createNewPost } = require('../service/postService.js');

const PostController = express.Router();

PostController.post('/', Auth, async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    if (!title) {
      return res.status(400).send({ message: '"title" is required' });
    }

    if (!content) {
      return res.status(400).send({ message: '"content" is required' });
    }

    if (!categoryIds) {
      return res.status(400).send({ message: '"categoryIds" not found' });
    }

    const categorie = await createNewPost(title, content, categoryIds);

    return res.status(201).send(categorie);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

module.exports = PostController;
