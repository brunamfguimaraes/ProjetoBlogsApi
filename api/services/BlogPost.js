// const { BlogPost, PostCategory } = require('../../models/index');
const { Category, BlogPost, PostCategory, User } = require('../../models/index');

const { titleIsValid, contentIsValid, categoryIdsAreValid } = require('../validations/post');

const validatingBodyData = async (title, content, categoryIds) => {
  const validTitle = titleIsValid(title);
  if (validTitle.errMsg) {
    return { codeErr: validTitle.codeErr, errMsg: validTitle.errMsg };
  }

  const validContent = contentIsValid(content);
  if (validContent.errMsg) {
    return { codeErr: validContent.codeErr, errMsg: validContent.errMsg };
  }

  const validCategoryIds = await categoryIdsAreValid(categoryIds);
  if (validCategoryIds.errMsg) {
    return { codeErr: validCategoryIds.codeErr, errMsg: validCategoryIds.errMsg };
  }

  return true;
};

const addNewPost = async (title, content, categoryIds, user) => {
  const bodyDataIsValid = await validatingBodyData(title, content, categoryIds);
  if (bodyDataIsValid.errMsg) {
    return { codeErr: bodyDataIsValid.codeErr, errMsg: bodyDataIsValid.errMsg };
  }

  let addedPost = null;

  try {
    addedPost = await BlogPost.create({ title, content, userId: user.id });
  } catch (error) {
    return { errMsg: error.message };
  }

  try {
    categoryIds.forEach(async (categoryId) => {
      await PostCategory.create({ postId: addedPost.id, categoryId });
    });
  } catch (error) {
    return { errMsg: error.message };
  }

  return addedPost;
};

const include = {
  include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
{ model: Category, as: 'categories', through: { attributes: [] } }],
};

const getAllPosts = async () => {
  try {
    const allPosts = await BlogPost.findAll(include);

    return allPosts;
  } catch (error) {
    return { errMsg: error.message };
  }
};

module.exports = {
  addNewPost,
  getAllPosts,
};
