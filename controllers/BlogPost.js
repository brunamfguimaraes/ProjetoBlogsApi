const express = require('express');
const rescue = require('express-rescue');
const Post = require('../services/BlogPost');
const { auth, postValidate, postEditValidate, authPostUser } = require('../middlewares');

const post = express.Router();

post.use(auth);

post.post(
  '/',
  postValidate,
  rescue(async (req, res, next) => {
    const { title, categoryIds, content } = req.body;
    const { id } = req.user;
    const newPost = await Post.create(id, title, categoryIds, content);
    if (newPost.isError) return next(newPost);
    return res.status(201).json(newPost);
  }),
);

post.get(
  '/search',
  rescue(async (req, res) => {
    const { q } = req.query;
    const postsResult = await Post.findTitle(q);
    return res.status(200).json(postsResult);
  }),
);

post.get(
  '/',
  rescue(async (_req, res) => {
    const allUsers = await Post.findAll();
    return res.status(200).json(allUsers);
  }),
);

post.get(
  '/:id',
  rescue(async (req, res, next) => {
    const { id } = req.params;
    const getPost = await Post.findByPk(id);
    if (getPost.isError) return next(getPost);
    return res.status(200).json(getPost);
  }),
);

post.put(
  '/:id',
  postEditValidate,
  authPostUser,
  rescue(async (req, res, next) => {
    const { id } = req.params;
    const postUpdated = await Post.update(id, req.body);
    if (postUpdated.isError) return next(postUpdated);
    res.status(200).json(postUpdated);
  }),
);

post.delete(
  '/:id',
  authPostUser,
  rescue(async (req, res) => {
    const { id } = req.params;
    await Post.destroy(id, req.body);
    res.status(204).json();
  }),
);

module.exports = post;
