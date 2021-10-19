const { 
  titleValid,
  contentValid,
  categoryIdsValid,
  checkCategories,
  postExistentValidById,
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

const getBlogPostByID = async (BlogPostByID) => {
  const verifyFields = postExistentValidById(BlogPostByID);

  if (verifyFields) {
    return verifyFields;
  }

  return {};
};

module.exports = { 
  addBlogPost,
  getBlogPostByID,
};