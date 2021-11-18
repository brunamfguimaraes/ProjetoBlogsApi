const createCategory = require('./createCategoryUseCase');

const createController = async (request, response, next) => {
  try {
    const { authorization } = request.headers;

    const categories = await createCategory(authorization, request.body);

    return response.status(201).json(categories);
  } catch (error) {
    return next(error);
  }
};

module.exports = createController;