const postModels = require('../model/blogPostModel');
const categoryModels = require('../model/categoriesModel');
const postsCategoryModels = require('../model/postCategory');

const generateError = require('../helpers/error');

const checkPostCategories = async (categoryArray) => Promise
.all(categoryArray.map((id) => categoryModels.getCategoryById(id)));

const createPostsCategory = async (postId, categoryIds) => {
  await Promise.all(categoryIds.map((category) => postsCategoryModels
    .createPostsCategory({ postId, categoryId: category })));
};

const postNewPost = async ({ userId, title, content, categoryIds }) => {
  const categoryCheck = await checkPostCategories(categoryIds);

  if (categoryCheck.includes(null)) return generateError.notFound('"categoryIds" not found');

  const result = await postModels.postNewPost({ userId, title, content, categoryIds });

  await createPostsCategory(result.dataValues.id, categoryIds);

  return result;
};

const getAllPosts = async () => {
  const result = await postModels.getAllPosts();

  return result;
};

module.exports = {
  postNewPost,
  getAllPosts,
};
