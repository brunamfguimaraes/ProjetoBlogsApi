const editPostUseCase = require('./editPostUseCase');

const editPostController = async (request, response, next) => {
  try {
    const { authorization } = request.headers;
    const { id } = request.params;

    const posts = await editPostUseCase(authorization, id, request.body);

    return response.status(200).json(posts);
  } catch (error) {
    return next(error);
  }
}

module.exports = editPostController