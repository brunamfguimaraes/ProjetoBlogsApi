const createPost = require('./createPostUseCase');

const create = async (request, response, next) => {
  try {
    const { authorization } = request.headers;

    const posts = await createPost(authorization, request.body);

    return response.status(201).json(posts);
  } catch (error) {
    return next(error);
  }
};

module.exports = create;