const removeUser = require('./deleteUserUseCase');

const remove = async(request, response, next) => {
  try {
    const { authorization } = request.headers;

    const users = await removeUser(authorization);

    return response.status(204).json(users);
  }catch(error) {
    return next(error);
  };
};

module.exports = remove;