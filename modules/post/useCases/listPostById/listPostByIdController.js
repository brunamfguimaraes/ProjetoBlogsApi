const listById = require('./listPostByIdUseCase');

const list = async (request, response, next) => {
  try {
    const { authorization } = request.headers;
    const { id } = request.params;

    const posts = await listById(authorization, id);

    return response.status(200).json(posts);
  } catch (error) {
    return next(error);
  }
};

module.exports = list;