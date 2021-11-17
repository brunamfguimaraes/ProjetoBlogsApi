const express = require('express');
const jwt = require('jsonwebtoken');
const Auth = require('../middlewares/auth');
const { createNewPost, lookForNullPostParams, 
  getAllPosts, getPostById, editPost } = require('../service/postService.js');

const PostController = express.Router();

PostController.put('/:id', Auth, async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id } = req.params;
    const token = req.headers.authorization;

    if (categoryIds) return res.status(400).send({ message: 'Categories cannot be edited' });  

    const user = jwt.verify(token, process.env.JWT_SECRET);

    const post = await editPost(user.data.id, id, title, content);

    if (post.message) {
      const { status, message } = post;
      return res.status(status).send({ message });  
    }

    return res.status(200).send(post);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

PostController.get('/:id', Auth, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await getPostById(id);
    if (!post) {
      return res.status(404).send({ message: 'Post does not exist' });  
    }
    return res.status(200).send(post);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

PostController.get('/', Auth, async (_req, res) => {
  try {
    const allPosts = await getAllPosts();

    return res.status(200).send(allPosts);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

PostController.post('/', Auth, async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const token = req.headers.authorization;

    const errorMessage = lookForNullPostParams(title, content, categoryIds);

    if (errorMessage) {
      return res.status(400).send(errorMessage);
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);

    const post = await createNewPost(user.data.id, title, content, categoryIds);

    if (post.message) {
      return res.status(400).send({ message: post.message });
    }

    return res.status(201).send(post);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

module.exports = PostController;
