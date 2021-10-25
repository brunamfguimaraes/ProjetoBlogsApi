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

async function validateCategoryKey(req, res, next) {
    const { categoryIds } = req.body;
    if (!categoryIds) return res.status(400).json(categoryIdRequiredError);
    const categories = categoryIds.map((category) => Category.findByPk(category));
    const promiseResolves = await Promise.all(categories);
      if (!promiseResolves.every((category) => category)) {
        return res.status(400).json(categoryIdNotFoundError);
      }
    next();
}

module.exports = { validateTitle, validateContent, validateCategoryKey };
