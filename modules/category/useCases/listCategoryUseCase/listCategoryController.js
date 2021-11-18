const listCategory = require('./listCategoryUseCase');

const listController = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const categories = await listCategory(authorization);

    return res.status(200).json(categories);
  } catch (error) {
    return next(error);
  }
};

module.exports = listController;