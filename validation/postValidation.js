const { dataIsRequired } = require('../helper/errorFunctions');

const validateTitle = (title) => {
  if (!title) {
    return dataIsRequired('title');
  }

  return {
    message: 'Succefull',
  };
};

const validateContent = (content) => {
  if (!content) {
    return dataIsRequired('content');
  }

  return {
    message: 'Succefull',
  };
};

const validateCategory = async (categories, fnHasCategories) => {
  if (!categories) {
    return dataIsRequired('categoryIds');
  }

  if (!Array.isArray(categories)) {
    return {
      error: {
        status: 400,
        message: '"categoryid" must be an array',
      },
    };
  }

  const hasCategories = await fnHasCategories();
  if (!hasCategories) {
    return { error: { status: 400, message: '"categoryIds" not found' } };
  }
  
  return { message: 'Succefull' };
};

module.exports = {
  validateTitle,
  validateContent,
  validateCategory,
};