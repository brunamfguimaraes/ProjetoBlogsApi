const userId = require('./listUserByIdUseCase');

const userById = async (request, response, next) => {
  try {
    const { id } = request.params;

    console.log('ID by controller', id);
    
    const { authorization } = request.headers;

    const users = await userId(id, authorization);

    return response.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};

module.exports = userById;