const { Category } = require('../models');

const titleRequiredError = { message: '"title" is required' };
const contentRequiredError = { message: '"content" is required' };
const categoryIdRequiredError = { message: '"categoryIds" is required' };
const categoryIdNotFoundError = { message: '"categoryIds" not found' };

function validateTitle(req, res, next) {
    const { title } = req.body;
    if (!title) return res.status(400).json(titleRequiredError);
    next();
  }
  
function validateContent(req, res, next) {
  const { content } = req.body;
  if (!content) return res.status(400).json(contentRequiredError);
    next();
}

function validateCategoryKey(req, res, next) {
    const { categoryIds } = req.body;
    if (!categoryIds) return res.status(400).json(categoryIdRequiredError);
    categoryIds.forEach(async (category) => {
        const categoryFound = await Category.findByPk(category);
        if (!categoryFound) return res.status(400).json(categoryIdNotFoundError);
    });
    next();
}

module.exports = { validateTitle, validateContent, validateCategoryKey };
