const listUsers = require('./listAllUsersUseCase');

const list = async(request, response, next) => {
  try {
    const { authorization } = request.headers;

    const users = await listUsers(authorization);

    return response.status(200).json(users);
  }catch(error) {
    return next(error);
  }
}

module.exports = list;