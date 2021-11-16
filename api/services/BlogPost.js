const { Category, BlogPost, PostCategory, User } = require('../../models/index');

const {
  titleIsValid,
  contentIsValid,
  categoryIdsAreValid,
  categoryIdsDoesntExist,
  userIsValid,
} = require('../validations/post');

const NOT_FOUND = 'not_found';

const validateTitleAndContent = (title, content) => {
  const validTitle = titleIsValid(title);
  if (validTitle.errMsg) {
    return { codeErr: validTitle.codeErr, errMsg: validTitle.errMsg };
  }

  const validContent = contentIsValid(content);
  if (validContent.errMsg) {
    return { codeErr: validContent.codeErr, errMsg: validContent.errMsg };
  }

  return true;
};

const validatingBodyData = async (title, content, categoryIds) => {
  const validTitleAndContent = validateTitleAndContent(title, content);
  if (validTitleAndContent.errMsg) {
    return { codeErr: validTitleAndContent.codeErr, errMsg: validTitleAndContent.errMsg };
  }

  const validCategoryIds = await categoryIdsAreValid(categoryIds);
  if (validCategoryIds.errMsg) {
    return { codeErr: validCategoryIds.codeErr, errMsg: validCategoryIds.errMsg };
  }

  return true;
};

const validateBodyEditPost = async ({ title, content, categoryIds }, postId, user) => {
  const validTitleAndContent = validateTitleAndContent(title, content);
  if (validTitleAndContent.errMsg) {
    return { codeErr: validTitleAndContent.codeErr, errMsg: validTitleAndContent.errMsg };
  }

  const validCategoryIds = await categoryIdsDoesntExist(categoryIds);
  if (validCategoryIds.errMsg) {
    return { codeErr: validCategoryIds.codeErr, errMsg: validCategoryIds.errMsg };
  }

  const validUser = await userIsValid(postId, user);
  if (validUser.errMsg) {
    return { codeErr: validUser.codeErr, errMsg: validUser.errMsg };
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

const include = [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
{ model: Category, as: 'categories', through: { attributes: [] } }];

const getAllPosts = async () => {
  try {
    const allPosts = await BlogPost.findAll({ include });

    return allPosts;
  } catch (error) {
    return { errMsg: error.message };
  }
};

const getPostById = async (id) => {
  let post = null;

  try {
    post = await BlogPost.findOne({
      where: { id },
      include,
    });
  } catch (error) {
    return { errMsg: error.message };
  }

  if (!post) return { codeErr: NOT_FOUND, errMsg: 'Post does not exist' };

  return post;
};

const editPost = async (body, postId, user) => {
  const bodyDataIsValid = await validateBodyEditPost(body, postId, user);
  if (bodyDataIsValid.errMsg) {
    return { codeErr: bodyDataIsValid.codeErr, errMsg: bodyDataIsValid.errMsg };
  }

  try {
    await BlogPost.update({ title: body.title, content: body.content }, { where: { id: postId } });
  } catch (error) {
    return { errMsg: error.message };
  }

  try {
    const editedPost = await BlogPost.findOne({
      where: { id: postId },
      include: [{ model: Category, as: 'categories', through: { attributes: [] } }],
    });

    return editedPost;
  } catch (error) {
    return { errMsg: error.message };
  }
};

const deletePost = async (postId, user) => {
  const post = await BlogPost.findByPk(postId);
  if (!post) return { codeErr: NOT_FOUND, errMsg: 'Post does not exist' };

  const validUser = await userIsValid(postId, user);
  if (validUser.errMsg) {
    return { codeErr: validUser.codeErr, errMsg: validUser.errMsg };
  }

  try {
    await BlogPost.destroy({ where: { id: postId } });

    return true;
  } catch (error) {
    return { errMsg: error.message };
  }
};

module.exports = {
  addNewPost,
  getAllPosts,
  getPostById,
  editPost,
  deletePost,
};
