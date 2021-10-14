require('dotenv').config();
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { postService, getPostsService } = require('../services');

const postController = async (req, res, next) => { 
  const { title, content, categoryIds } = req.body;
  const { authorization } = req.headers;
  
  const payload = jwt.verify(authorization, process.env.JWT_SECRET);
  const { data: { id } } = payload;

  const postUser = await postService(title, content, id, categoryIds);

  const { userId: idUser, title: titleUser, content: contentUser, id: idPost } = postUser;

  if (postUser.message) return next(postUser);

  res.status(StatusCodes.CREATED)
  .json({ id: idPost, userId: idUser, title: titleUser, content: contentUser });
};

const getPostsController = async (_req, res, _next) => {
  const allUsers = await getPostsService();
  res.status(StatusCodes.OK).json(allUsers);
};

module.exports = { postController, getPostsController };
