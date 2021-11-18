const createUser = require('./createUserUseCase');

const create = async (request, response, next) => {
  try {
    const users = await createUser(request.body);

    return response.status(201).json(users);
  } catch (error) {
    // console.log(error)
    return next(error);
  }
};

module.exports = create;