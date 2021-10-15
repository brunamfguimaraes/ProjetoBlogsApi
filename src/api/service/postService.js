const { addNewPost,
  getPostAll, getPostById, getCategoryId, addNewBlogs } = require('../model/postModel');
const { badRequest } = require('../middleware/error/constructErro');

const postCategoryIds = async (categoryIds) => {
  const allCategories = [];
  await Promise.all(categoryIds.map(async (id) => {
    const result = await getCategoryId(id);
    allCategories.push(result);
  }));
  return allCategories;
};

const controllerAddNewPost = async (userId, title, categoryIds, content) => {
  const resultCategoryIds = await postCategoryIds(categoryIds);
  console.log('resultCategoryIds :', resultCategoryIds);
  if (resultCategoryIds.includes(null)) return badRequest('"categoryIds" not found');

  const resultAddBlogs = await addNewBlogs({ userId, title, content, categoryIds });
  console.log('resultAddBlogs :', resultAddBlogs);
  await addNewPost(resultAddBlogs.dataValues.id, categoryIds);
  return resultAddBlogs;
};

module.exports = {
  getPostAll,
  getPostById,
  getCategoryId,
  controllerAddNewPost,
};