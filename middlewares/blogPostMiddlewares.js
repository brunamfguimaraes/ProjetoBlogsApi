const Category = require('../models');

// Comments: Lista de erros
const errors = {
  titleRequired: '"title" is required',
  contentRequired: '"content" is required',
  categoryIdsRequired: '"categoryIds" is required',
  categoryIdsNotFound: '"categoryids" not found',
};

// Comments: Valida se o campo title foi informado na requisição.
const validateTitleWasInformed = async (req, res, next) => {
  const { title } = req.body;

  if (!title || title === undefined) {
    return res.status(400).json({ message: errors.titleRequired });
  }

  next();
};

// Comments: Valida se o campo content foi informado na requisição.
const validateContentWasInformed = async (req, res, next) => {
  const { content } = req.body;

  if (!content || content === undefined) {
    return res.status(400).json({ message: errors.contentRequired });
  }

  next();
};

// Comments: Valida se o campo categoryids foi informado na requisição.
const validateCategoryWasInformed = async (req, res, next) => {
  const { categoryIds } = req.body;

  if (!categoryIds || categoryIds === undefined) {
    return res.status(400).json({ message: errors.categoryIdsRequired });
  }

  next();
};

// Comments: Valida se as categoryids informadas na requisição existem na base de dados.
const validateCategoryIdAlreadyRegistered = async (req, res, next) => {
    const { categoryIds } = req.body;
    console.log(categoryIds);

    const categories = await Category.findAll({ in: { categoryIds } });

    if (categories.length !== categoryIds.length) {
      return res.status(400).json({ message: errors.categoryIdsNotFound });
    }

    next();
};

module.exports = {
  validateTitleWasInformed,
  validateContentWasInformed,
  validateCategoryWasInformed,
  validateCategoryIdAlreadyRegistered,
};