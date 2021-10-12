const { Category } = require('../models');

function validateName(name) {
  if (!name) {
    return null;
  }

  return true;
}

async function create(body) {
  console.log(body);
  const newCategory = await Category.create(body);

  return newCategory;
}

module.exports = { 
  create,
  validateName,
};