const { Router } = require('express');

const createController = require(
  '../modules/post/useCases/createPost/createPostController',
  );

const listAllController = require(
  '../modules/post/useCases/listPost/listAllPostController',
);
const listPostByIdController = require(
  '../modules/post/useCases/listPostById/listPostByIdController',
)

const postRouter = Router();

postRouter.post('/', createController);
postRouter.get('/', listAllController);
postRouter.get('/:id', listPostByIdController);

module.exports = postRouter;