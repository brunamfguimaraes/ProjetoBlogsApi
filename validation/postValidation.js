const { dataIsRequired } = require('../helper/helpers');

const titleValidation = (title) => {
  if (!title) {
    return dataIsRequired('title');
  }

  return {
    message: 'Succefull',
  };
};

const contentValidation = (content) => {
  if (!content) {
    return dataIsRequired('content');
  }

  return {
    message: 'Succefull',
  };
};

const categoryValidation = (categories, fnHasCategories) => {
  if (!categories) {
    return dataIsRequired('categoryId');
  }

  if (!Array.isArray(categories)) {
    return {
      error: {
        status: 400,
        message: '"categoryid" must be an array',
      },
    };
  }

  if (!fnHasCategories) {
    return { error: { status: 400, message: '"categoryIds" not found' } };
  }
  
  return { message: 'Succefull' };
};

module.exports = {
  titleValidation,
  contentValidation,
  categoryValidation,
};