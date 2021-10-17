const isValidTitle = (title) => {
  if (!title) {
    return '"title" is required';
  }

  return false;
};

const isValidContent = (content) => {
  if (!content) {
    return '"content" is required';
  }

  return false;
};

const isValidCategoryIds = (id) => {
  if (!id) {
    return '"categoryIds" is required';
  }

  return false;
};

module.exports = { isValidTitle, isValidContent, isValidCategoryIds };