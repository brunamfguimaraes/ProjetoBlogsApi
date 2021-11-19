const deletePostUseCase = require('./deletePostUseCase');

const deletePostController = async (request, response, next) => {
  try {
    const { authorization } = request.headers;
    const { id } = request.params;

    const posts = await deletePostUseCase(authorization, id);

    return response.status(204).json(posts);
  } catch (error) {
    return next(error);
  }
};

module.exports = deletePostController;