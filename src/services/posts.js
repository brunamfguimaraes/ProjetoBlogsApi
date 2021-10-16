const { 
  titleValid,
  contentValid,
  categoryIdsValid,
  checkCategories,
} = require('../validations');

const addBlogPost = async ({ title, content, categoryIds }, categoryExist) => {
  const verifyFields = titleValid(title)
  || contentValid(content)
  || categoryIdsValid(categoryIds)
  || checkCategories(categoryExist);

  if (verifyFields) {
    return verifyFields;
  }

  return {};
};

module.exports = { 
  addBlogPost,
};