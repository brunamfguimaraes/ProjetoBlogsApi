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
const editPostController = require(
  '../modules/post/useCases/editPost/editPostController'
)

const deletePostController = require(
  '../modules/post/useCases/deletePost/deletePostController'
)

const postRouter = Router();

postRouter.post('/', createController);
postRouter.get('/', listAllController);
postRouter.get('/:id', listPostByIdController);
postRouter.put('/:id', editPostController);
postRouter.delete('/:id', deletePostController);

module.exports = postRouter;