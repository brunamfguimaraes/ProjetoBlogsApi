const { Router } = require('express');

const createController = require(
  '../modules/post/useCases/createPost/createPostController',
  );

const listAllController = require(
  '../modules/post/useCases/listPost/listAllPostController',
);

const postRouter = Router();

postRouter.post('/', createController);
postRouter.get('/', listAllController);

module.exports = postRouter;