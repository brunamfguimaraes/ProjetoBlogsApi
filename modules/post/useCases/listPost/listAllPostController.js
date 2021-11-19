const listAll = require('./listAllPostUseCase');

const list = async (request, response, next) => {
  try {
    const { authorization } = request.headers;

    const posts = await listAll(authorization);

    return response.status(200).json(posts);
  } catch (error) {
    return next(error);
  }
};

module.exports = list;