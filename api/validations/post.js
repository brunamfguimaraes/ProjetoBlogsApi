const { BlogPost, Category } = require('../../models/index');

const BAD_REQUEST = 'bad_request';
const UNAUTHORIZED = 'unauthorized';

const titleIsValid = (title) => {
  if (!title) {
    return { codeErr: BAD_REQUEST, errMsg: '"title" is required' };
  }

  return true;
};

const contentIsValid = (content) => {
  if (!content) {
    return { codeErr: BAD_REQUEST, errMsg: '"content" is required' };
  }

  return true;
};

const categoryIdsAreValid = async (categoryIds) => {
  if (!categoryIds) {
    return { codeErr: BAD_REQUEST, errMsg: '"categoryIds" is required' };
  }

  if (!Array.isArray(categoryIds)) {
    return { codeErr: BAD_REQUEST, errMsg: '"categoryIds" not found' };
  }

  const categories = await Category.findAll();
  const allCategoryIds = categories.map(({ id }) => id);

  const checkIfIncludes = (categoryId) => allCategoryIds.includes(categoryId);

  const allCategoryIdsExists = categoryIds.every(checkIfIncludes);
  if (!allCategoryIdsExists) {
    return { codeErr: BAD_REQUEST, errMsg: '"categoryIds" not found' };
  }

  return true;
};

const categoryIdsDoesntExist = (categoryIds) => {
  if (categoryIds) {
    return { codeErr: BAD_REQUEST, errMsg: 'Categories cannot be edited' };
  }

  return true;
};

const userIsValid = async (postId, user) => {
  const post = await BlogPost.findByPk(postId);

  if (post.userId !== user.id) {
    return { codeErr: UNAUTHORIZED, errMsg: 'Unauthorized user' };
  }

  return true;
};

module.exports = {
  titleIsValid,
  contentIsValid,
  categoryIdsAreValid,
  categoryIdsDoesntExist,
  userIsValid,
};
