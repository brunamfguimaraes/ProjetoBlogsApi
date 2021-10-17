const isValidTitle = (title) => {
  if (!title) {
    return '"title" is required';
  }

  return false;
};

const isValidContent = (content) => {
  if (!content) {
    return '"name" is required';
  }

  return false;
};

const isValidCategoryIds = (id) => {
  if (!id) {
    return '"categoryId" is required';
  }

  return false;
};

module.exports = { isValidTitle, isValidContent, isValidCategoryIds };